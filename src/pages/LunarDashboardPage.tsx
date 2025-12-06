import React, { useEffect, useState } from 'react';
import { fetchMoonPhase } from '../api/client';
import type { MoonPhase } from '../types';

const LunarDashboardPage: React.FC = () => {
  const [phase, setPhase] = useState<MoonPhase | null>(null);

  useEffect(() => {
    fetchMoonPhase().then(setPhase);
  }, []);

  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ marginBottom: 10, paddingLeft: 4 }}>
        <div style={{ fontSize: 18, fontWeight: 600 }}>Lunar cycles</div>
        <div style={{ fontSize: 13, color: '#9ca3af' }}>
          See how the moon moves and how your garden glows with it.
        </div>
      </div>
      <div className="glass-card" style={{ padding: 18, marginBottom: 12 }}>
        {phase ? (
          <>
            <div style={{ fontSize: 32, marginBottom: 6 }}>{phase.emoji}</div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>{phase.label}</div>
            <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 4 }}>
              Day {phase.dayInCycle} of {phase.cycleLength}
            </div>
            <div
              style={{
                marginTop: 12,
                height: 10,
                borderRadius: 999,
                background: 'rgba(15,23,42,0.9)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${(phase.dayInCycle / phase.cycleLength) * 100}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #6fffe9, #b8a9ff, #f4d58d)',
                  boxShadow: '0 0 16px rgba(184,169,255,0.8)',
                }}
              />
            </div>
          </>
        ) : (
          <div style={{ color: '#9ca3af' }}>Listening to the sky...</div>
        )}
      </div>
      <div className="glass-card--soft" style={{ padding: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 6 }}>Upcoming full moon</div>
        <div style={{ fontSize: 13, color: '#9ca3af' }}>
          The next full moon will bathe your garden in silver light. Plan a gentle ritual or a
          milestone for that night.
        </div>
      </div>
    </div>
  );
};

export default LunarDashboardPage;
