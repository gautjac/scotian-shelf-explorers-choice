import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './utils/clearCachedConfig'

createRoot(document.getElementById("root")!).render(<App />);
