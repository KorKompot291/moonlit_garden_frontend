import React from 'react';

interface Props {
  currentPath: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onNavigate: (path: string) => any;
}

const BottomNav: React.FC<Props> = ({ currentPath, onNavigate }) => {
  const makeHandler = (path: string) => () => onNavigate(path);
  const isActive = (path: string) => currentPath === path;

  return (
    <nav className="app-bottom-nav">
      <button
        className={
          'app-bottom-nav-button' +
          (isActive('/garden') || isActive('/') ? ' app-bottom-nav-button--active' : '')
        }
        onClick={makeHandler('/garden')}
      >
        <span className="app-bottom-nav-icon">🌿</span>
        <span>Garden</span>
      </button>
      <button
        className={
          'app-bottom-nav-button' + (isActive('/artifacts') ? ' app-bottom-nav-button--active' : '')
        }
        onClick={makeHandler('/artifacts')}
      >
        <span className="app-bottom-nav-icon">💎</span>
        <span>Artifacts</span>
      </button>
      <button
        className={
          'app-bottom-nav-button' + (isActive('/lunar') ? ' app-bottom-nav-button--active' : '')
        }
        onClick={makeHandler('/lunar')}
      >
        <span className="app-bottom-nav-icon">🌙</span>
        <span>Lunar</span>
      </button>
      <button
        className={
          'app-bottom-nav-button' + (isActive('/settings') ? ' app-bottom-nav-button--active' : '')
        }
        onClick={makeHandler('/settings')}
      >
        <span className="app-bottom-nav-icon">⚙️</span>
        <span>Settings</span>
      </button>
    </nav>
  );
};

export default BottomNav;
