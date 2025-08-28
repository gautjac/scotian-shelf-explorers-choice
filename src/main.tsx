import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initializeCacheClearing } from './utils/cacheManager'
import { initializeContentVerification } from './utils/contentVerification'
import { debugStoredContent } from './utils/debugHelper'

// Initialize cache clearing and content verification
initializeCacheClearing();
initializeContentVerification();

// Make debug helper available globally for testing
setTimeout(debugStoredContent, 3000);

createRoot(document.getElementById("root")!).render(<App />);
