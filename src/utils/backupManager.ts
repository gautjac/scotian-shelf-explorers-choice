import { storeConfiguration, retrieveConfiguration, persistentStorage } from './persistentStorage';

interface BackupMetadata {
  id: string;
  timestamp: string;
  type: 'comprehensive' | 'impact';
  trigger: 'manual' | 'auto-import';
  size: number;
  contentSummary: string;
}

interface BackupData {
  metadata: BackupMetadata;
  data: any;
}

const BACKUP_PREFIX = 'backup_';
const BACKUP_INDEX_KEY = 'backup_index';
const MAX_BACKUPS = 10;

// Generate backup ID
const generateBackupId = (type: string, trigger: string): string => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  return `${BACKUP_PREFIX}${type}_${timestamp}_${trigger}`;
};

// Create backup of current configuration with persistent storage
export const createBackup = async (type: 'comprehensive' | 'impact', trigger: 'manual' | 'auto-import'): Promise<string> => {
  try {
    // Try persistent storage first, fallback to localStorage
    let currentData = await retrieveConfiguration(type);
    
    if (!currentData) {
      // Fallback to localStorage
      const localData = localStorage.getItem(`${type}Configuration`);
      if (localData) {
        currentData = JSON.parse(localData);
      }
    }
    
    if (!currentData) {
      throw new Error(`No ${type} configuration found to backup`);
    }

    const backupId = generateBackupId(type, trigger);
    const parsedData = currentData;
    
    // Generate content summary
    let contentSummary = '';
    if (type === 'comprehensive') {
      const scenarioCount = Object.keys(parsedData.scenarios || {}).length;
      const uiCount = Object.keys(parsedData.uiElements || {}).length;
      contentSummary = `${scenarioCount} scenarios, ${uiCount} UI elements`;
    } else {
      const scenarioCount = Object.keys(parsedData).length;
      contentSummary = `${scenarioCount} scenarios with impact values`;
    }

    const metadata: BackupMetadata = {
      id: backupId,
      timestamp: new Date().toISOString(),
      type,
      trigger,
      size: JSON.stringify(currentData).length,
      contentSummary
    };

    const backup: BackupData = {
      metadata,
      data: parsedData
    };

    // Store backup in persistent storage and localStorage
    await persistentStorage.store(backupId, backup);
    localStorage.setItem(backupId, JSON.stringify(backup));
    
    // Update backup index
    updateBackupIndex(metadata);
    
    // Cleanup old backups
    cleanupOldBackups();
    
    return backupId;
  } catch (error) {
    console.error('Failed to create backup:', error);
    throw error;
  }
};

// Update backup index
const updateBackupIndex = (metadata: BackupMetadata): void => {
  const indexData = localStorage.getItem(BACKUP_INDEX_KEY);
  const index: BackupMetadata[] = indexData ? JSON.parse(indexData) : [];
  
  // Add new backup metadata
  index.push(metadata);
  
  // Sort by timestamp (newest first)
  index.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  
  localStorage.setItem(BACKUP_INDEX_KEY, JSON.stringify(index));
};

// Get list of all backups
export const listBackups = (): BackupMetadata[] => {
  try {
    const indexData = localStorage.getItem(BACKUP_INDEX_KEY);
    return indexData ? JSON.parse(indexData) : [];
  } catch (error) {
    console.error('Failed to list backups:', error);
    return [];
  }
};

// Restore from backup with persistent storage
export const restoreFromBackup = async (backupId: string): Promise<void> => {
  try {
    // Try persistent storage first, fallback to localStorage
    let backup: BackupData | null = await persistentStorage.retrieve(backupId);
    
    if (!backup) {
      const backupData = localStorage.getItem(backupId);
      if (!backupData) {
        throw new Error('Backup not found');
      }
      backup = JSON.parse(backupData);
    }

    const { metadata, data } = backup;
    const type = metadata.type;
    
    // Create a backup of current state before restoring
    try {
      await createBackup(type, 'manual');
    } catch (e) {
      // Continue with restore even if backup creation fails
      console.warn('Failed to create backup before restore:', e);
    }
    
    // Restore the data to persistent storage and localStorage
    await storeConfiguration(type, data);
    localStorage.setItem(`${type}Configuration`, JSON.stringify(data));
    
    // Dispatch events to notify app
    const eventName = type === 'comprehensive' ? 'comprehensive-config-updated' : 'impact-config-updated';
    window.dispatchEvent(new Event(eventName));
    
  } catch (error) {
    console.error('Failed to restore backup:', error);
    throw error;
  }
};

// Delete specific backup
export const deleteBackup = (backupId: string): void => {
  try {
    localStorage.removeItem(backupId);
    
    // Update index
    const indexData = localStorage.getItem(BACKUP_INDEX_KEY);
    if (indexData) {
      const index: BackupMetadata[] = JSON.parse(indexData);
      const updatedIndex = index.filter(backup => backup.id !== backupId);
      localStorage.setItem(BACKUP_INDEX_KEY, JSON.stringify(updatedIndex));
    }
  } catch (error) {
    console.error('Failed to delete backup:', error);
    throw error;
  }
};

// Cleanup old backups (keep only MAX_BACKUPS)
const cleanupOldBackups = (): void => {
  try {
    const backups = listBackups();
    if (backups.length <= MAX_BACKUPS) return;
    
    // Delete oldest backups
    const toDelete = backups.slice(MAX_BACKUPS);
    toDelete.forEach(backup => {
      localStorage.removeItem(backup.id);
    });
    
    // Update index
    const remainingBackups = backups.slice(0, MAX_BACKUPS);
    localStorage.setItem(BACKUP_INDEX_KEY, JSON.stringify(remainingBackups));
  } catch (error) {
    console.error('Failed to cleanup old backups:', error);
  }
};

// Export backup as downloadable file
export const exportBackup = (backupId: string): void => {
  try {
    const backupData = localStorage.getItem(backupId);
    if (!backupData) {
      throw new Error('Backup not found');
    }

    const backup: BackupData = JSON.parse(backupData);
    const filename = `backup_${backup.metadata.type}_${backup.metadata.timestamp.split('T')[0]}.json`;
    
    const blob = new Blob([backupData], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to export backup:', error);
    throw error;
  }
};

// Validate storage integrity
export const validateStorageIntegrity = (): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  try {
    // Check comprehensive configuration
    const comprehensiveData = localStorage.getItem('comprehensiveConfiguration');
    if (comprehensiveData) {
      try {
        JSON.parse(comprehensiveData);
      } catch (e) {
        errors.push('Comprehensive configuration is corrupted');
      }
    }
    
    // Check impact configuration
    const impactData = localStorage.getItem('impactConfiguration');
    if (impactData) {
      try {
        JSON.parse(impactData);
      } catch (e) {
        errors.push('Impact configuration is corrupted');
      }
    }
    
    // Check backup index
    const indexData = localStorage.getItem(BACKUP_INDEX_KEY);
    if (indexData) {
      try {
        JSON.parse(indexData);
      } catch (e) {
        errors.push('Backup index is corrupted');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  } catch (error) {
    errors.push('Failed to validate storage');
    return { isValid: false, errors };
  }
};

// Get storage usage stats
export const getStorageStats = () => {
  try {
    let totalSize = 0;
    let backupSize = 0;
    let configSize = 0;
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;
      
      const value = localStorage.getItem(key);
      const size = value ? value.length : 0;
      totalSize += size;
      
      if (key.startsWith(BACKUP_PREFIX)) {
        backupSize += size;
      } else if (key.includes('Configuration')) {
        configSize += size;
      }
    }
    
    const backupCount = listBackups().length;
    
    return {
      totalSize: Math.round(totalSize / 1024), // KB
      backupSize: Math.round(backupSize / 1024), // KB
      configSize: Math.round(configSize / 1024), // KB
      backupCount,
      maxBackups: MAX_BACKUPS
    };
  } catch (error) {
    console.error('Failed to get storage stats:', error);
    return {
      totalSize: 0,
      backupSize: 0,
      configSize: 0,
      backupCount: 0,
      maxBackups: MAX_BACKUPS
    };
  }
};
