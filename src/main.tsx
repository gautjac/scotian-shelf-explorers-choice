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

const blocker = document.getElementById('preload-blocker');
if (blocker) document.body.appendChild(blocker);

let hid = false;
let sawFirstPaint = false;
const start = performance.now();
let lastMutationAt = performance.now();

// Monitor DOM mutations to keep blocker on top and track "quiet window"
const mo = new MutationObserver(() => {
  lastMutationAt = performance.now();
  // Keep blocker last in the body to stay on top
  const b = document.getElementById('preload-blocker');
  if (b && document.body.lastElementChild !== b) {
    document.body.appendChild(b);
  }
});
mo.observe(document.body, { childList: true, subtree: false });

const tryHide = () => {
  if (hid || !sawFirstPaint) return;
  const quietFor = performance.now() - lastMutationAt;
  const elapsed = performance.now() - start;
  const minTime = isLovablePreview ? 1000 : 800;
  
  if (quietFor >= 500 && elapsed >= minTime) {
    hid = true;
    mo.disconnect();
    // Re-append one last time to be safe
    const b = document.getElementById('preload-blocker');
    if (b) {
      document.body.appendChild(b);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          b.classList.add('fade-out');
          setTimeout(() => b.remove(), 350);
        });
      });
    }
  } else {
    requestAnimationFrame(tryHide);
  }
};

// First paint detection
try {
  if ('PerformanceObserver' in window) {
    const po = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          po.disconnect();
          sawFirstPaint = true;
          requestAnimationFrame(tryHide);
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
  sawFirstPaint = true;
  requestAnimationFrame(tryHide);
});

// Final failsafe
setTimeout(() => {
  if (!hid) {
    hid = true;
    mo.disconnect();
    const b = document.getElementById('preload-blocker');
    if (b) {
      b.classList.add('fade-out');
      setTimeout(() => b.remove(), 350);
    }
  }
}, 4000);
