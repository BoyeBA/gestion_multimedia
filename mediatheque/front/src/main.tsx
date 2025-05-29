import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import { WorksProvider } from './context/WorksContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <WorksProvider>
          <App />
        </WorksProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);