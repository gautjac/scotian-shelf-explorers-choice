const { app, BrowserWindow, Menu, globalShortcut } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

// Disable security warnings in dev mode
if (isDev) {
  process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
}

let mainWindow;

function createWindow() {
  // Create the main browser window in kiosk mode
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    kiosk: true,           // True kiosk mode - full screen with no window controls
    frame: false,          // Remove window frame completely
    fullscreen: true,      // Force fullscreen
    autoHideMenuBar: true, // Hide menu bar
    resizable: false,      // Disable resizing
    minimizable: false,    // Disable minimizing
    maximizable: false,    // Disable maximizing
    closable: true,        // Allow closing (for development)
    webPreferences: {
      nodeIntegration: false,           // Disable node integration for security
      contextIsolation: true,           // Enable context isolation for security
      enableRemoteModule: false,        // Disable remote module for security
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: !isDev,              // Disable web security in dev mode only
      allowRunningInsecureContent: false,
      experimentalFeatures: false
    },
    show: false, // Don't show until ready
    icon: path.join(__dirname, '../public/favicon.ico')
  });

  // Disable menu bar completely
  Menu.setApplicationMenu(null);

  // Load the app
  if (isDev) {
    mainWindow.loadURL('http://localhost:8080');
    // Open DevTools in development (optional - can be removed for true kiosk)
    // mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    // Focus the window and bring to front
    mainWindow.focus();
    mainWindow.setAlwaysOnTop(true);
    
    // Disable zoom
    mainWindow.webContents.setZoomFactor(1.0);
    mainWindow.webContents.setVisualZoomLevelLimits(1, 1);
  });

  // Prevent new window creation
  mainWindow.webContents.setWindowOpenHandler(() => {
    return { action: 'deny' };
  });

  // Disable right-click context menu
  mainWindow.webContents.on('context-menu', (event) => {
    event.preventDefault();
  });

  // Prevent navigation away from the app
  mainWindow.webContents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    
    if (parsedUrl.origin !== 'http://localhost:8080' && parsedUrl.origin !== 'file://') {
      event.preventDefault();
    }
  });

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Disable keyboard shortcuts that could break kiosk mode
function registerKioskShortcuts() {
  // Disable Alt+Tab, Alt+F4, F11, Ctrl+Shift+I, etc.
  const shortcutsToDisable = [
    'Alt+Tab',
    'Alt+F4',
    'F11',
    'Ctrl+Shift+I',
    'Ctrl+Shift+J',
    'Ctrl+U',
    'F5',
    'Ctrl+R',
    'Ctrl+Shift+R',
    'Escape',
    'Alt+Left',
    'Alt+Right',
    'Ctrl+W',
    'Ctrl+Shift+W',
    'Ctrl+T',
    'Ctrl+Shift+T',
    'Ctrl+N',
    'Ctrl+Shift+N',
    'Ctrl+Plus',
    'Ctrl+-',
    'Ctrl+0'
  ];

  shortcutsToDisable.forEach(shortcut => {
    globalShortcut.register(shortcut, () => {
      // Do nothing - effectively disables the shortcut
      console.log(`Blocked shortcut: ${shortcut}`);
    });
  });

  // Special admin exit combination (Ctrl+Shift+Alt+X)
  globalShortcut.register('Ctrl+Shift+Alt+X', () => {
    console.log('Admin exit requested');
    app.quit();
  });
}

// App event handlers
app.whenReady().then(() => {
  createWindow();
  registerKioskShortcuts();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  // Unregister all shortcuts
  globalShortcut.unregisterAll();
  
  // On macOS, keep app running even when all windows are closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  // Unregister all shortcuts before quitting
  globalShortcut.unregisterAll();
});

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault();
  });
});

// Prevent certificate errors in production
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  if (isDev) {
    // In development, ignore certificate errors
    event.preventDefault();
    callback(true);
  } else {
    // In production, use default behavior
    callback(false);
  }
});
