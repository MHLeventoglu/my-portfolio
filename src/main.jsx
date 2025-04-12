import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ReactGA from 'react-ga4';
import App from './App.jsx'

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

if (import.meta.env.PROD && GA_MEASUREMENT_ID) {
  ReactGA.initialize(GA_MEASUREMENT_ID);
} else {
  if (!import.meta.env.PROD) {
    console.log("GA Not Initialized: Not in production environment.");
  }
  if (!GA_MEASUREMENT_ID) {
    console.warn("GA Not Initialized: VITE_GA_MEASUREMENT_ID environment variable is missing.");
  }
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
