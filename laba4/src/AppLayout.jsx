import { NavLink, Outlet } from 'react-router';

export default function AppLayout() {
  return <div className="app">
    <header><p className="eyebrow">FRONTEND / ЛАБОРАТОРНА №4</p><h1>Світлофор</h1><p>Маршрутизація та спільний стан застосунку</p></header>
    <nav className="navigation" aria-label="Головна навігація">
      <NavLink to="/" end>Головна</NavLink>
      <NavLink to="/traffic-light">Світлофор</NavLink>
      <NavLink to="/stats">Статистика</NavLink>
      <NavLink to="/status">Стан</NavLink>
    </nav>
    <main id="main-content"><Outlet /></main>
    <footer>CP4 · Стан зберігається між сторінками у поточній вкладці.</footer>
  </div>;
}
