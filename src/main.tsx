import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initializeCacheClearing } from './utils/cacheManager'
import { initializeContentVerification } from './utils/contentVerification'

// Initialize cache clearing and content verification
initializeCacheClearing();
initializeContentVerification();

createRoot(document.getElementById("root")!).render(<App />);
