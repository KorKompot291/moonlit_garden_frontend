import React, { useMemo } from 'react';

const AmbientBackground: React.FC = () => {
  const fireflies = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, index) => {
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 4;
        const duration = 3 + Math.random() * 4;
        return { left, top, delay, duration, id: index };
      }),
    []
  );

  return (
    <div className="app-background-layer">
      <div className="app-ambient-gradient" />
      <div className="app-stars-layer" />
      <div className="app-fireflies-layer">
        {fireflies.map((f) => (
          <div
            key={f.id}
            className="firefly"
            style={{
              left: `${f.left}%`,
              top: `${f.top}%`,
              animationDuration: `${f.duration}s`,
              animationDelay: `${f.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AmbientBackground;
