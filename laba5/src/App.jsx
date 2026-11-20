import { Routes, Route } from 'react-router';
import AppLayout from './AppLayout';
import HomePage from './pages/HomePage';
import TrafficLightPage from './pages/TrafficLightPage';
import StatsPage from './pages/StatsPage';
import StatusPage from './pages/StatusPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

export default function App() {
  return <Routes><Route element={<AppLayout />}>
    <Route index element={<HomePage />} />
    <Route path="traffic-light" element={<TrafficLightPage />} />
    <Route path="stats" element={<StatsPage />} />
    <Route path="status" element={<StatusPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Route></Routes>;
}
