// Content verification utility to track what's actually loaded
export const verifyContentSource = () => {
  console.log('🔍 [CONTENT-VERIFY] Starting content source verification...');
  
  try {
    // Import and check the current content
    import('../data/content').then(contentModule => {
      const { scenarios } = contentModule;
      
      // Check English scenarios for verification
      const enScenarios = scenarios.en || [];
      const firstScenario = enScenarios[0];
      
      if (firstScenario) {
        const contentHash = btoa(firstScenario.description.substring(0, 50));
        console.log('📊 [CONTENT-VERIFY] Content loaded from: offlineContent.ts (single source of truth)');
        console.log('📊 [CONTENT-VERIFY] First scenario ID:', firstScenario.id);
        console.log('📊 [CONTENT-VERIFY] First scenario title:', firstScenario.title);
        console.log('📊 [CONTENT-VERIFY] Description preview:', firstScenario.description.substring(0, 100) + '...');
        console.log('📊 [CONTENT-VERIFY] Content hash:', contentHash);
        console.log('📊 [CONTENT-VERIFY] Total scenarios loaded:', enScenarios.length);
        
        // Check for any persistent storage overrides
        const hasComprehensiveConfig = localStorage.getItem('comprehensiveConfiguration') !== null;
        const hasImpactConfig = localStorage.getItem('impactConfiguration') !== null;
        
        if (hasComprehensiveConfig || hasImpactConfig) {
          console.warn('⚠️ [CONTENT-VERIFY] WARNING: Persistent storage detected but should not affect runtime');
          console.warn('⚠️ [CONTENT-VERIFY] This storage is only for source file generation');
        }
        
        // Display verification in UI
        displayContentVerification({
          source: 'offlineContent.ts',
          scenarioId: firstScenario.id,
          title: firstScenario.title,
          descriptionPreview: firstScenario.description.substring(0, 100),
          contentHash,
          totalScenarios: enScenarios.length,
          timestamp: new Date().toISOString()
        });
      }
    });
  } catch (error) {
    console.error('❌ [CONTENT-VERIFY] Failed to verify content source:', error);
  }
};

const displayContentVerification = (info: any) => {
  // Create verification display element
  const existingVerify = document.getElementById('content-verification');
  if (existingVerify) {
    existingVerify.remove();
  }
  
  const verifyDiv = document.createElement('div');
  verifyDiv.id = 'content-verification';
  verifyDiv.style.cssText = `
    position: fixed;
    bottom: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 10px;
    border-radius: 5px;
    font-family: monospace;
    font-size: 11px;
    z-index: 1000;
    max-width: 300px;
    border: 1px solid #333;
  `;
  
  verifyDiv.innerHTML = `
    <div><strong>Content Source:</strong> ${info.source}</div>
    <div><strong>First Scenario:</strong> ${info.scenarioId}</div>
    <div><strong>Title:</strong> ${info.title}</div>
    <div><strong>Preview:</strong> ${info.descriptionPreview}...</div>
    <div><strong>Hash:</strong> ${info.contentHash}</div>
    <div><strong>Total:</strong> ${info.totalScenarios} scenarios</div>
    <div><strong>Loaded:</strong> ${new Date(info.timestamp).toLocaleTimeString()}</div>
    <button onclick="this.parentElement.remove()" style="margin-top: 5px; padding: 2px 5px; background: #666; color: white; border: none; border-radius: 3px; cursor: pointer;">Close</button>
  `;
  
  document.body.appendChild(verifyDiv);
  
  // Auto-remove after 10 seconds
  setTimeout(() => {
    if (verifyDiv.parentElement) {
      verifyDiv.remove();
    }
  }, 10000);
};

// Initialize verification on load
export const initializeContentVerification = () => {
  console.log('🚀 [CONTENT-VERIFY] Initializing content verification system');
  
  // Verify immediately
  setTimeout(verifyContentSource, 1000);
  
  // Also verify on any route changes or updates
  window.addEventListener('comprehensive-config-updated', verifyContentSource);
  window.addEventListener('cache-cleared', verifyContentSource);
};