const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Add any secure APIs here if needed
  platform: process.platform,
  
  // Example: If you need to communicate with main process
  // sendMessage: (message) => ipcRenderer.invoke('send-message', message),
  
  // Kiosk mode status
  isKioskMode: true,
  
  // App version
  appVersion: process.env.npm_package_version || '1.0.0'
});

// Security: Remove access to Node.js APIs
delete window.require;
delete window.exports;
delete window.module;

// Prevent zoom via keyboard shortcuts
window.addEventListener('keydown', (event) => {
  // Prevent Ctrl +/- zoom
  if (event.ctrlKey && (event.key === '+' || event.key === '-' || event.key === '0')) {
    event.preventDefault();
  }
  
  // Prevent F11 fullscreen toggle
  if (event.key === 'F11') {
    event.preventDefault();
  }
  
  // Prevent F5 refresh
  if (event.key === 'F5') {
    event.preventDefault();
  }
  
  // Prevent Ctrl+R refresh
  if (event.ctrlKey && event.key === 'r') {
    event.preventDefault();
  }
});

// Prevent right-click context menu
window.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});

// Prevent text selection (optional - might interfere with game interactions)
window.addEventListener('selectstart', (event) => {
  event.preventDefault();
});

// Prevent drag and drop
window.addEventListener('dragover', (event) => {
  event.preventDefault();
});

window.addEventListener('drop', (event) => {
  event.preventDefault();
});

// Hide cursor after inactivity (optional for true kiosk experience)
let cursorTimeout;
const hideCursor = () => {
  document.body.style.cursor = 'none';
};

const showCursor = () => {
  document.body.style.cursor = 'default';
  clearTimeout(cursorTimeout);
  cursorTimeout = setTimeout(hideCursor, 5000); // Hide after 5 seconds of inactivity
};

// Uncomment to enable cursor hiding
// window.addEventListener('mousemove', showCursor);
// window.addEventListener('mousedown', showCursor);
// showCursor(); // Initial setup