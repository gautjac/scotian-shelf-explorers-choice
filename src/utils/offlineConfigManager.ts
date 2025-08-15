// Enhanced offline configuration manager with cross-tab sync and initialization improvements
import { persistentStorage, storeConfiguration, retrieveConfiguration } from './persistentStorage';

interface ConfigSyncEvent {
  type: 'config-updated' | 'config-loaded' | 'config-sync-request';
  configType: 'comprehensive' | 'impact';
  timestamp: number;
  data?: any;
}

class OfflineConfigManager {
  private channel: BroadcastChannel | null = null;
  private isInitialized = false;
  private initPromise: Promise<void> | null = null;
  private configCache = new Map<string, any>();

  constructor() {
    this.initializeBroadcastChannel();
  }

  private initializeBroadcastChannel() {
    if ('BroadcastChannel' in window) {
      this.channel = new BroadcastChannel('ocean-guardian-config');
      this.channel.addEventListener('message', this.handleBroadcastMessage.bind(this));
    }
  }

  private handleBroadcastMessage(event: MessageEvent<ConfigSyncEvent>) {
    const { type, configType, data } = event.data;
    
    switch (type) {
      case 'config-updated':
        this.configCache.set(configType, data);
        window.dispatchEvent(new CustomEvent(`${configType}-config-updated`, { detail: data }));
        break;
        
      case 'config-sync-request':
        // Respond with current config if available
        const cachedConfig = this.configCache.get(configType);
        if (cachedConfig) {
          this.broadcastMessage({
            type: 'config-loaded',
            configType,
            timestamp: Date.now(),
            data: cachedConfig
          });
        }
        break;
        
      case 'config-loaded':
        if (data && !this.configCache.has(configType)) {
          this.configCache.set(configType, data);
          window.dispatchEvent(new CustomEvent(`${configType}-config-updated`, { detail: data }));
        }
        break;
    }
  }

  private broadcastMessage(message: ConfigSyncEvent) {
    if (this.channel) {
      this.channel.postMessage(message);
    }
  }

  async initialize(): Promise<void> {
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = this.performInitialization();
    return this.initPromise;
  }

  private async performInitialization(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Initialize persistent storage
      await persistentStorage.initialize();

      // Pre-load configurations into cache
      const configs = await Promise.allSettled([
        this.loadConfiguration('comprehensive'),
        this.loadConfiguration('impact')
      ]);

      // Request sync from other tabs
      this.requestConfigSync('comprehensive');
      this.requestConfigSync('impact');

      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize offline config manager:', error);
      throw error;
    }
  }

  private requestConfigSync(configType: 'comprehensive' | 'impact') {
    this.broadcastMessage({
      type: 'config-sync-request',
      configType,
      timestamp: Date.now()
    });
  }

  async loadConfiguration(type: 'comprehensive' | 'impact'): Promise<any> {
    await this.initialize();

    // Check cache first
    const cached = this.configCache.get(type);
    if (cached) {
      return cached;
    }

    try {
      // Try persistent storage with enhanced fallback
      let config = await retrieveConfiguration(type);
      
      // Enhanced localStorage fallback with validation
      if (!config) {
        const localKey = `${type}Configuration`;
        const localData = localStorage.getItem(localKey);
        if (localData) {
          try {
            config = JSON.parse(localData);
            // Re-store in persistent layers for next time
            await storeConfiguration(type, config);
          } catch (parseError) {
            console.error(`Failed to parse localStorage ${type} config:`, parseError);
          }
        }
      }

      // Try embedded build-time configuration
      if (!config) {
        config = await this.loadBuildTimeConfig(type);
        if (config) {
          // Store embedded config in persistent storage
          await storeConfiguration(type, config);
        }
      }

      if (config) {
        this.configCache.set(type, config);
        this.broadcastConfigUpdate(type, config);
      }

      return config;
    } catch (error) {
      console.error(`Failed to load ${type} configuration:`, error);
      return null;
    }
  }

  private async loadBuildTimeConfig(type: 'comprehensive' | 'impact'): Promise<any> {
    try {
      // Check if embedded configurations are available
      const configPath = `/embedded-configs/${type}-config.json`;
      const response = await fetch(configPath);
      
      if (response.ok) {
        const config = await response.json();
        console.log(`📦 Loaded embedded ${type} configuration`);
        return config;
      }
    } catch (error) {
      // Embedded configs not available, this is normal in development
    }
    return null;
  }

  async storeConfiguration(type: 'comprehensive' | 'impact', data: any): Promise<void> {
    await this.initialize();

    try {
      // Store in persistent storage
      await storeConfiguration(type, data);
      
      // Update cache
      this.configCache.set(type, data);
      
      // Broadcast to other tabs
      this.broadcastConfigUpdate(type, data);
      
      // Trigger local event
      window.dispatchEvent(new CustomEvent(`${type}-config-updated`, { detail: data }));
    } catch (error) {
      console.error(`Failed to store ${type} configuration:`, error);
      throw error;
    }
  }

  private broadcastConfigUpdate(type: 'comprehensive' | 'impact', data: any) {
    this.broadcastMessage({
      type: 'config-updated',
      configType: type,
      timestamp: Date.now(),
      data
    });
  }

  async checkStorageHealth() {
    await this.initialize();
    return await persistentStorage.checkStorageHealth();
  }

  async createBackup(type: 'comprehensive' | 'impact'): Promise<boolean> {
    await this.initialize();
    const key = `${type}Configuration`;
    return await persistentStorage.createDownloadBackup(key);
  }

  async syncAllConfigurations(): Promise<void> {
    await this.initialize();
    
    try {
      // Re-store all cached configurations to ensure persistence
      const syncPromises = [];
      
      for (const [type, data] of this.configCache.entries()) {
        if (data) {
          syncPromises.push(storeConfiguration(type as any, data));
        }
      }
      
      await Promise.all(syncPromises);
    } catch (error) {
      console.error('Failed to sync configurations:', error);
      throw error;
    }
  }

  destroy() {
    if (this.channel) {
      this.channel.close();
      this.channel = null;
    }
    this.configCache.clear();
    this.isInitialized = false;
    this.initPromise = null;
  }
}

// Global instance
export const offlineConfigManager = new OfflineConfigManager();

// Convenience functions
export const loadOfflineConfig = (type: 'comprehensive' | 'impact') => 
  offlineConfigManager.loadConfiguration(type);

export const storeOfflineConfig = (type: 'comprehensive' | 'impact', data: any) => 
  offlineConfigManager.storeConfiguration(type, data);

export const checkOfflineStorageHealth = () => 
  offlineConfigManager.checkStorageHealth();

export const syncOfflineConfigurations = () => 
  offlineConfigManager.syncAllConfigurations();