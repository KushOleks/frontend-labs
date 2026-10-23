import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { TrafficLightsProvider } from './TrafficLightsContext';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode><BrowserRouter><TrafficLightsProvider><App /></TrafficLightsProvider></BrowserRouter></StrictMode>,
);
