import React, { useEffect, useState } from 'react';
import { fetchArtifacts } from '../api/client';
import type { Artifact } from '../types';

const rarityColors: Record<Artifact['rarity'], string> = {
  common: 'rgba(111,255,233,0.5)',
  rare: 'rgba(184,169,255,0.8)',
  legendary: 'rgba(244,213,141,0.9)',
  mythic: 'rgba(244,213,141,1)',
};

const ArtifactsPage: React.FC = () => {
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);

  useEffect(() => {
    fetchArtifacts().then(setArtifacts);
  }, []);

  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ marginBottom: 10, paddingLeft: 4 }}>
        <div style={{ fontSize: 18, fontWeight: 600 }}>Artifacts</div>
        <div style={{ fontSize: 13, color: '#9ca3af' }}>
          Crystals, mushrooms, moths and runes you have discovered.
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: 10,
        }}
      >
        {artifacts.map((a) => (
          <div
            key={a.id}
            className="glass-card"
            style={{
              padding: 10,
              position: 'relative',
              borderWidth: 2,
              borderStyle: 'solid',
              borderColor: rarityColors[a.rarity],
              opacity: a.isLocked ? 0.6 : 1,
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: a.isLocked
                  ? 'linear-gradient(to bottom right, rgba(15,23,42,0.9), rgba(15,23,42,0.7))'
                  : 'radial-gradient(circle at top, rgba(255,255,255,0.08), transparent 60%)',
                mixBlendMode: 'soft-light',
              }}
            />
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>
                {a.type === 'crystal' && '💎'}
                {a.type === 'mushroom' && '🍄'}
                {a.type === 'moth' && '🦋'}
                {a.type === 'talisman' && '🔮'}
                {a.type === 'rune' && '📿'}
              </div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>
                {a.isLocked ? '?? Mystery relic ??' : a.name}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: '#9ca3af',
                  marginTop: 4,
                  minHeight: 32,
                }}
              >
                {a.isLocked ? 'The moon has not yet revealed this artifact.' : a.description}
              </div>
              <div style={{ marginTop: 6, fontSize: 10, color: '#9ca3af' }}>
                Rarity: {a.rarity.toUpperCase()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtifactsPage;
