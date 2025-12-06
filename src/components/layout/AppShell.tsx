import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TopBar from './TopBar';
import BottomNav from './BottomNav';
import AmbientBackground from '../visual/AmbientBackground';

interface Props {
  children: React.ReactNode;
}

const AppShell: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="app-root">
      <div className="app-shell">
        <AmbientBackground />
        <div className="app-content-layer">
          <TopBar />
          <div className="app-garden-scroll">{children}</div>
          <BottomNav currentPath={location.pathname} onNavigate={navigate} />
        </div>
      </div>
    </div>
  );
};

export default AppShell;
