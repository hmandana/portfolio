import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { serviceWorkerManager } from './utils/serviceWorker.ts'

// Register service worker
if (import.meta.env.PROD) {
  serviceWorkerManager.register().then(() => {
    console.log('Service Worker registered successfully');
  }).catch((error) => {
    console.error('Service Worker registration failed:', error);
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
