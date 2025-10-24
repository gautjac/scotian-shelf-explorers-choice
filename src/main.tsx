import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initializeContentVerification } from './utils/contentVerification'
import { debugStoredContent } from './utils/debugHelper'

// Initialize content verification (cache clearing is handled in App.tsx)
initializeContentVerification();

// Make debug helper available globally for testing
setTimeout(debugStoredContent, 3000);

createRoot(document.getElementById("root")!).render(<App />);

// Detect if we're in Lovable preview
const isLovablePreview = !!document.querySelector('script[src*="gptengineer.js"]');

const safelyHidePreload = (extraDelay = 0) => {
  const blocker = document.getElementById('preload-blocker');
  if (!blocker) return;
  
  // Ensure we're the last child so we're above any equal z-index overlays
  document.body.appendChild(blocker);

  const doFade = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        blocker.classList.add('fade-out');
        setTimeout(() => blocker.remove(), 350);
      });
    });
  };

  if (extraDelay > 0) {
    setTimeout(doFade, extraDelay);
  } else {
    doFade();
  }
};

let hid = false;
const hideOnce = (delay = 0) => {
  if (hid) return;
  hid = true;
  safelyHidePreload(delay);
};

// Prefer First Contentful Paint if available
try {
  if ('PerformanceObserver' in window) {
    const po = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          po.disconnect();
          // Delay slightly in preview to outlast the editor overlay
          hideOnce(isLovablePreview ? 200 : 0);
          break;
        }
      }
    });
    po.observe({ type: 'paint', buffered: true });
  }
} catch {
  // Ignore observer failures
}

// Fallback: window load
window.addEventListener('load', () => {
  hideOnce(isLovablePreview ? 250 : 0);
});

// Final failsafe
setTimeout(() => hideOnce(0), 3000);
