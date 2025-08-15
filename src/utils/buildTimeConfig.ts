// Build-time configuration injection utilities
import { exportComprehensiveCSV } from './comprehensiveConfiguration';
import { exportChoicesToCSV } from './impactConfiguration';

export interface BuildConfig {
  comprehensive?: any;
  impact?: any;
  timestamp: number;
  version: string;
}

// Generate build configuration from current state
export const generateBuildConfig = async (): Promise<BuildConfig> => {
  const config: BuildConfig = {
    timestamp: Date.now(),
    version: '1.0.0'
  };

  try {
    // Try to get comprehensive configuration
    const comprehensiveData = localStorage.getItem('comprehensiveConfiguration');
    if (comprehensiveData) {
      config.comprehensive = JSON.parse(comprehensiveData);
    }

    // Try to get impact configuration
    const impactData = localStorage.getItem('impactConfiguration');
    if (impactData) {
      config.impact = JSON.parse(impactData);
    }
  } catch (error) {
    console.error('Failed to generate build config:', error);
  }

  return config;
};

// Export configurations for build embedding
export const exportForBuild = async (): Promise<{ 
  comprehensive: string; 
  impact: string; 
  config: string; 
}> => {
  const buildConfig = await generateBuildConfig();
  
  return {
    comprehensive: JSON.stringify(buildConfig.comprehensive || {}, null, 2),
    impact: JSON.stringify(buildConfig.impact || {}, null, 2),
    config: JSON.stringify(buildConfig, null, 2)
  };
};

// Create a downloadable build package
export const createBuildPackage = async (): Promise<void> => {
  try {
    const buildData = await exportForBuild();
    const comprehensiveCSV = exportComprehensiveCSV();
    const impactCSV = exportChoicesToCSV();
    
    const packageData = {
      configs: buildData,
      csvExports: {
        comprehensive: comprehensiveCSV,
        impact: impactCSV
      },
      buildInstructions: {
        setup: [
          "1. Place config files in public/embedded-configs/ directory",
          "2. Add comprehensive-config.json and impact-config.json",
          "3. The app will automatically detect and use embedded configs",
          "4. This ensures configurations work offline and across all environments"
        ],
        files: [
          "public/embedded-configs/comprehensive-config.json",
          "public/embedded-configs/impact-config.json"
        ]
      },
      metadata: {
        generated: new Date().toISOString(),
        version: '1.0.0',
        description: 'Ocean Guardian offline configuration package'
      }
    };
    
    const blob = new Blob([JSON.stringify(packageData, null, 2)], { 
      type: 'application/json' 
    });
    
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `ocean-guardian-build-package-${Date.now()}.json`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to create build package:', error);
    throw error;
  }
};

// PWA cache integration
export const cacheConfigurations = async (): Promise<boolean> => {
  if (!('caches' in window)) {
    return false;
  }

  try {
    const cache = await caches.open('ocean-guardian-config-v1');
    const buildData = await exportForBuild();
    
    // Cache configuration files
    await cache.put(
      '/embedded-configs/comprehensive-config.json',
      new Response(buildData.comprehensive, {
        headers: { 'Content-Type': 'application/json' }
      })
    );
    
    await cache.put(
      '/embedded-configs/impact-config.json',
      new Response(buildData.impact, {
        headers: { 'Content-Type': 'application/json' }
      })
    );
    
    await cache.put(
      '/embedded-configs/build-config.json',
      new Response(buildData.config, {
        headers: { 'Content-Type': 'application/json' }
      })
    );
    
    return true;
  } catch (error) {
    console.error('Failed to cache configurations:', error);
    return false;
  }
};