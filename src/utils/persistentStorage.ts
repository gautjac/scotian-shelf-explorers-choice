// Robust offline storage system with multiple layers
// Priority: IndexedDB > Cache API > localStorage > fallback

interface StorageData {
  timestamp: number;
  data: any;
  version: string;
}

interface StorageHealth {
  indexedDB: boolean;
  cache: boolean;
  localStorage: boolean;
  errors: string[];
}

const APP_VERSION = '1.0.0';
const DB_NAME = 'OceanGuardianStorage';
const DB_VERSION = 1;
const STORE_NAME = 'configurations';
const CACHE_NAME = 'ocean-guardian-content';

// IndexedDB Management
class IndexedDBManager {
  private db: IDBDatabase | null = null;

  async initialize(): Promise<boolean> {
    return new Promise((resolve) => {
      if (!window.indexedDB) {
        console.warn('IndexedDB not available');
        resolve(false);
        return;
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        console.error('Failed to open IndexedDB:', request.error);
        resolve(false);
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve(true);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'key' });
        }
      };
    });
  }

  async store(key: string, data: any): Promise<boolean> {
    if (!this.db) return false;

    return new Promise((resolve) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      
      const storageData: StorageData = {
        timestamp: Date.now(),
        data,
        version: APP_VERSION
      };

      const request = store.put({ key, ...storageData });

      request.onsuccess = () => resolve(true);
      request.onerror = () => {
        console.error('Failed to store in IndexedDB:', request.error);
        resolve(false);
      };
    });
  }

  async retrieve(key: string): Promise<any | null> {
    if (!this.db) return null;

    return new Promise((resolve) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);

      request.onsuccess = () => {
        const result = request.result;
        if (result && result.data) {
          resolve(result.data);
        } else {
          resolve(null);
        }
      };

      request.onerror = () => {
        console.error('Failed to retrieve from IndexedDB:', request.error);
        resolve(null);
      };
    });
  }

  async clear(): Promise<void> {
    if (!this.db) return;

    return new Promise((resolve) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => {
        console.error('Failed to clear IndexedDB:', request.error);
        resolve();
      };
    });
  }
}

// Cache API Management
class CacheManager {
  async store(key: string, data: any): Promise<boolean> {
    if (!('caches' in window)) return false;

    try {
      const cache = await caches.open(CACHE_NAME);
      const storageData: StorageData = {
        timestamp: Date.now(),
        data,
        version: APP_VERSION
      };

      const response = new Response(JSON.stringify(storageData), {
        headers: { 'Content-Type': 'application/json' }
      });

      await cache.put(key, response);
      return true;
    } catch (error) {
      console.error('Failed to store in Cache API:', error);
      return false;
    }
  }

  async retrieve(key: string): Promise<any | null> {
    if (!('caches' in window)) return null;

    try {
      const cache = await caches.open(CACHE_NAME);
      const response = await cache.match(key);
      
      if (!response) return null;

      const storageData: StorageData = await response.json();
      return storageData.data;
    } catch (error) {
      console.error('Failed to retrieve from Cache API:', error);
      return null;
    }
  }

  async clear(): Promise<void> {
    if (!('caches' in window)) return;

    try {
      await caches.delete(CACHE_NAME);
    } catch (error) {
      console.error('Failed to clear Cache API:', error);
    }
  }
}

// Enhanced localStorage with validation
class LocalStorageManager {
  store(key: string, data: any): boolean {
    try {
      const storageData: StorageData = {
        timestamp: Date.now(),
        data,
        version: APP_VERSION
      };
      
      localStorage.setItem(key, JSON.stringify(storageData));
      
      // Verify storage
      const verification = localStorage.getItem(key);
      return verification !== null;
    } catch (error) {
      console.error('Failed to store in localStorage:', error);
      return false;
    }
  }

  retrieve(key: string): any | null {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;

      const storageData: StorageData = JSON.parse(item);
      return storageData.data;
    } catch (error) {
      console.error('Failed to retrieve from localStorage:', error);
      return null;
    }
  }

  clear(): void {
    try {
      // Clear only our app's data
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.includes('Configuration') || key.includes('backup_'))) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  }
}

// Main persistent storage class
export class PersistentStorage {
  private indexedDB: IndexedDBManager;
  private cache: CacheManager;
  private localStorage: LocalStorageManager;
  private initialized = false;

  constructor() {
    this.indexedDB = new IndexedDBManager();
    this.cache = new CacheManager();
    this.localStorage = new LocalStorageManager();
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;

    await this.indexedDB.initialize();
    this.initialized = true;
  }

  // Store data across all available storage layers
  async store(key: string, data: any): Promise<{ success: boolean; storedIn: string[] }> {
    await this.initialize();

    const results = [];
    const storedIn: string[] = [];

    // Try IndexedDB first
    const indexedDBSuccess = await this.indexedDB.store(key, data);
    if (indexedDBSuccess) {
      storedIn.push('IndexedDB');
      results.push(true);
    }

    // Try Cache API
    const cacheSuccess = await this.cache.store(key, data);
    if (cacheSuccess) {
      storedIn.push('Cache API');
      results.push(true);
    }

    // Try localStorage
    const localStorageSuccess = this.localStorage.store(key, data);
    if (localStorageSuccess) {
      storedIn.push('localStorage');
      results.push(true);
    }

    return {
      success: results.length > 0,
      storedIn
    };
  }

  // Retrieve data with fallback chain
  async retrieve(key: string): Promise<any | null> {
    await this.initialize();

    // Try IndexedDB first
    let data = await this.indexedDB.retrieve(key);
    if (data) return data;

    // Try Cache API
    data = await this.cache.retrieve(key);
    if (data) {
      // Re-store in IndexedDB for next time
      this.indexedDB.store(key, data);
      return data;
    }

    // Try localStorage
    data = this.localStorage.retrieve(key);
    if (data) {
      // Re-store in higher priority storage
      this.indexedDB.store(key, data);
      this.cache.store(key, data);
      return data;
    }

    return null;
  }

  // Check storage health across all layers
  async checkStorageHealth(): Promise<StorageHealth> {
    await this.initialize();

    const health: StorageHealth = {
      indexedDB: false,
      cache: false,
      localStorage: false,
      errors: []
    };

    // Test IndexedDB
    try {
      const testKey = '_health_check_indexeddb';
      const testData = { test: true };
      const stored = await this.indexedDB.store(testKey, testData);
      if (stored) {
        const retrieved = await this.indexedDB.retrieve(testKey);
        health.indexedDB = retrieved && retrieved.test === true;
      }
    } catch (error) {
      health.errors.push(`IndexedDB error: ${error}`);
    }

    // Test Cache API
    try {
      const testKey = '_health_check_cache';
      const testData = { test: true };
      const stored = await this.cache.store(testKey, testData);
      if (stored) {
        const retrieved = await this.cache.retrieve(testKey);
        health.cache = retrieved && retrieved.test === true;
      }
    } catch (error) {
      health.errors.push(`Cache API error: ${error}`);
    }

    // Test localStorage
    try {
      const testKey = '_health_check_localstorage';
      const testData = { test: true };
      const stored = this.localStorage.store(testKey, testData);
      if (stored) {
        const retrieved = this.localStorage.retrieve(testKey);
        health.localStorage = retrieved && retrieved.test === true;
      }
    } catch (error) {
      health.errors.push(`localStorage error: ${error}`);
    }

    return health;
  }

  // Clear all storage layers
  async clearAll(): Promise<void> {
    await this.initialize();

    await Promise.all([
      this.indexedDB.clear(),
      this.cache.clear(),
    ]);
    
    this.localStorage.clear();
  }

  // Auto-backup to downloads folder
  async createDownloadBackup(key: string): Promise<boolean> {
    try {
      const data = await this.retrieve(key);
      if (!data) return false;

      const backup = {
        key,
        data,
        timestamp: new Date().toISOString(),
        version: APP_VERSION
      };

      const blob = new Blob([JSON.stringify(backup, null, 2)], { 
        type: 'application/json' 
      });
      
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.setAttribute('href', url);
      link.setAttribute('download', `ocean-guardian-backup-${key}-${Date.now()}.json`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
      return true;
    } catch (error) {
      console.error('Failed to create download backup:', error);
      return false;
    }
  }
}

// Global instance
export const persistentStorage = new PersistentStorage();

// Configuration-specific helpers
export const storeConfiguration = async (type: 'comprehensive' | 'impact', data: any) => {
  const key = `${type}Configuration`;
  const result = await persistentStorage.store(key, data);
  
  // Trigger storage events for app components
  const eventName = type === 'comprehensive' ? 'comprehensive-config-updated' : 'impact-config-updated';
  window.dispatchEvent(new CustomEvent(eventName, { detail: { storedIn: result.storedIn } }));
  
  return result;
};

export const retrieveConfiguration = async (type: 'comprehensive' | 'impact') => {
  const key = `${type}Configuration`;
  return await persistentStorage.retrieve(key);
};

export const checkConfigurationHealth = async () => {
  return await persistentStorage.checkStorageHealth();
};

export const createAutoBackup = async (type: 'comprehensive' | 'impact') => {
  const key = `${type}Configuration`;
  return await persistentStorage.createDownloadBackup(key);
};