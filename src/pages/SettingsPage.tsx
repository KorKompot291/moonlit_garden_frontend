import React, { useEffect, useState } from 'react';
import { fetchSettings } from '../api/client';
import type { UserSettings } from '../types';

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<UserSettings | null>(null);

  useEffect(() => {
    fetchSettings().then(setSettings);
  }, []);

  if (!settings) {
    return (
      <div style={{ marginTop: 40, textAlign: 'center', color: '#9ca3af' }}>
        Calling the spirits of settings...
      </div>
    );
  }

  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ marginBottom: 10, paddingLeft: 4 }}>
        <div style={{ fontSize: 18, fontWeight: 600 }}>Settings</div>
        <div style={{ fontSize: 13, color: '#9ca3af' }}>Shape how your garden feels and sounds.</div>
      </div>
      <div className="glass-card" style={{ padding: 16 }}>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>Appearance</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['light', 'auto', 'dark'].map((option) => (
              <button
                key={option}
                style={{
                  padding: '4px 10px',
                  borderRadius: 999,
                  border:
                    settings.theme === option
                      ? '1px solid rgba(244,213,141,0.9)'
                      : '1px solid rgba(148,163,184,0.5)',
                  background:
                    settings.theme === option
                      ? 'radial-gradient(circle, rgba(244,213,141,0.4), rgba(15,23,42,0.9))'
                      : 'rgba(15,23,42,0.9)',
                  color: '#e5e7eb',
                  fontSize: 11,
                  cursor: 'pointer',
                }}
              >
                {option === 'light' && 'Day'}
                {option === 'auto' && 'Auto'}
                {option === 'dark' && 'Night'}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>Sync with moon phase</div>
          <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>
            Let the garden subtly shift with the real sky.
          </div>
          <div className="tag-pill">
            <span>{settings.syncWithMoon ? 'On' : 'Off'}</span>
          </div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>Notifications</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 12, color: '#9ca3af' }}>
            <li>• Daily reminder</li>
            <li>• Full moon alert</li>
            <li>• Streak milestones</li>
            <li>• Artifact found</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
