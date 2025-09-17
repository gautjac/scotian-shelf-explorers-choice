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
