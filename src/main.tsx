import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async'; // ✅ Import HelmetProvider
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider> {/* ✅ Wrap App in HelmetProvider */}
      <App />
    </HelmetProvider>
  </StrictMode>
);