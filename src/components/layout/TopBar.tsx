import React, { useEffect, useState } from 'react';
import { fetchMoonPhase } from '../../api/client';
import type { MoonPhase } from '../../types';

const TopBar: React.FC = () => {
  const [phase, setPhase] = useState<MoonPhase | null>(null);

  useEffect(() => {
    fetchMoonPhase().then(setPhase).catch(() => {});
  }, []);

  return (
    <header className="app-header">
      <div className="app-header-left">
        <div className="app-header-moon" />
        <div>
          <div className="app-header-text-main">
            {phase ? `${phase.emoji} ${phase.label}` : 'Moonlit Garden'}
          </div>
          <div className="app-header-text-sub">Tend your rituals under gentle light</div>
        </div>
      </div>
      <div className="app-header-energy">
        <div className="app-header-energy-bar">
          <div className="app-header-energy-fill" />
        </div>
        <div className="app-header-energy-value">Moonlight: 127 💧</div>
      </div>
    </header>
  );
};

export default TopBar;
