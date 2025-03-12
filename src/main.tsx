
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initClarity } from './lib/clarity'

// Initialize Microsoft Clarity
initClarity();

createRoot(document.getElementById("root")!).render(<App />);
