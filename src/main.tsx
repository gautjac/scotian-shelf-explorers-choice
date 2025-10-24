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

// Hide preload blocker after first paint
const hidePreload = () => {
  const el = document.getElementById('preload-blocker');
  if (!el) return;
  // Wait one frame to ensure React painted at least once
  requestAnimationFrame(() => {
    el.classList.add('fade-out');
    setTimeout(() => el.remove(), 350);
  });
};
hidePreload();
