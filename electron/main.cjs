const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

// --- Activity Log ---
// Writes to a rotating log file next to the executable (or in the project root during dev).
// Museum staff can review this file to troubleshoot black-screen or other issues.

const LOG_DIR = app.isPackaged
  ? path.join(path.dirname(process.execPath), 'logs')
  : path.join(__dirname, '..', 'logs');

const MAX_LOG_SIZE = 5 * 1024 * 1024; // 5 MB — rotate after this

function ensureLogDir() {
  try { fs.mkdirSync(LOG_DIR, { recursive: true }); } catch {}
}

function getLogPath() {
  return path.join(LOG_DIR, 'activity.log');
}

function rotateLogIfNeeded() {
  const logPath = getLogPath();
  try {
    const stats = fs.statSync(logPath);
    if (stats.size > MAX_LOG_SIZE) {
      const backup = path.join(LOG_DIR, 'activity.prev.log');
      try { fs.unlinkSync(backup); } catch {}
      fs.renameSync(logPath, backup);
    }
  } catch {}
}

function writeLog(level, message) {
  ensureLogDir();
  rotateLogIfNeeded();
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] [${level}] ${message}\n`;
  try {
    fs.appendFileSync(getLogPath(), line);
  } catch (err) {
    // If we can't write the log, print to stdout as fallback
    process.stdout.write(line);
  }
}

// --- Window Setup ---

let mainWindow;

function createWindow() {
  writeLog('APP', 'Creating main window');

  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    fullscreen: true,
    kiosk: true,
    frame: false,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.cjs'),
      zoomFactor: 1.0,
    },
  });

  // Lock zoom level
  mainWindow.webContents.setZoomFactor(1.0);
  mainWindow.webContents.setVisualZoomLevelLimits(1, 1);

  // Prevent right-click context menu
  mainWindow.webContents.on('context-menu', (e) => {
    e.preventDefault();
  });

  // Prevent new windows from opening
  mainWindow.webContents.setWindowOpenHandler(() => {
    return { action: 'deny' };
  });

  // Prevent zoom factor changes via keyboard
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if ((input.control || input.meta) && (input.key === '+' || input.key === '-' || input.key === '=' || input.key === '0')) {
      event.preventDefault();
    }
  });

  // --- Capture renderer console messages to log file ---
  mainWindow.webContents.on('console-message', (event, level, message, line, sourceId) => {
    // level: 0=verbose, 1=info, 2=warning, 3=error
    const levelName = ['VERBOSE', 'INFO', 'WARN', 'ERROR'][level] || 'LOG';

    // Always log errors and warnings
    if (level >= 2) {
      writeLog(levelName, message);
    }
    // Log activity-tagged messages (our custom activity tracker)
    if (message.startsWith('[ACTIVITY]') || message.startsWith('[PHASE]') || message.startsWith('[ERROR]')) {
      writeLog('UI', message);
    }
  });

  // Log renderer crashes
  mainWindow.webContents.on('render-process-gone', (event, details) => {
    writeLog('CRASH', `Renderer process gone: reason=${details.reason}, exitCode=${details.exitCode}`);
    // Attempt recovery: reload the app
    setTimeout(() => {
      writeLog('RECOVERY', 'Attempting to reload app after crash');
      mainWindow.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
    }, 2000);
  });

  // Log unresponsive renderer
  mainWindow.webContents.on('unresponsive', () => {
    writeLog('WARN', 'Renderer became unresponsive');
  });

  mainWindow.webContents.on('responsive', () => {
    writeLog('INFO', 'Renderer became responsive again');
  });

  // Log page load events
  mainWindow.webContents.on('did-finish-load', () => {
    writeLog('APP', 'Page finished loading');
  });

  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    writeLog('ERROR', `Page failed to load: code=${errorCode}, desc=${errorDescription}`);
  });

  // Load the built app
  const indexPath = path.join(__dirname, '..', 'dist', 'index.html');
  writeLog('APP', `Loading: ${indexPath}`);
  mainWindow.loadFile(indexPath);

  mainWindow.on('closed', () => {
    writeLog('APP', 'Window closed');
    mainWindow = null;
  });
}

// Disable hardware acceleration issues on some Linux systems
app.disableHardwareAcceleration();

app.whenReady().then(() => {
  writeLog('APP', `App ready. Version: ${app.getVersion()}, Electron: ${process.versions.electron}, Platform: ${process.platform}`);
  writeLog('APP', `Log directory: ${LOG_DIR}`);
  createWindow();
});

app.on('window-all-closed', () => {
  writeLog('APP', 'All windows closed, quitting');
  app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// Log uncaught exceptions
process.on('uncaughtException', (error) => {
  writeLog('CRASH', `Uncaught exception: ${error.message}\n${error.stack}`);
});

process.on('unhandledRejection', (reason) => {
  writeLog('CRASH', `Unhandled rejection: ${reason}`);
});
