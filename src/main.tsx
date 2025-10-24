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

// Hide preload blocker after app has rendered
const hidePreload = () => {
  const blocker = document.getElementById('preload-blocker');
  if (blocker) {
    // Wait for two animation frames to ensure the app has painted
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        blocker.classList.add('fade-out');
        setTimeout(() => blocker.remove(), 350);
      });
    });
  }
};

// Failsafe: Remove blocker after 2.5s if painting is delayed
const failsafe = setTimeout(() => {
  const blocker = document.getElementById('preload-blocker');
  if (blocker) {
    blocker.classList.add('fade-out');
    setTimeout(() => blocker.remove(), 350);
  }
}, 2500);

// Hide preload blocker
hidePreload();
// Clear failsafe if hidePreload completes normally
setTimeout(() => clearTimeout(failsafe), 100);
