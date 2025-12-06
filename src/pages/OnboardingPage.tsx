import React from 'react';
import { useNavigate } from 'react-router-dom';
import CrescentButton from '../components/common/CrescentButton';

const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="app-root">
      <div
        className="app-shell"
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="glass-card" style={{ padding: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🌙✨</div>
          <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>Moonlit Garden</div>
          <div style={{ fontSize: 14, color: '#9ca3af', marginBottom: 18 }}>
            Tend your habits under gentle lunar light. Each small step grows a new piece of your
            mystical garden.
          </div>
          <CrescentButton
            label="Begin your journey"
            icon={<span>🌱</span>}
            onClick={() => navigate('/garden')}
          />
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
