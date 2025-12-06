import React from 'react';
import type { Habit } from '../../types';
import { useNavigate } from 'react-router-dom';
import HabitStreakRing from '../common/HabitStreakRing';

interface Props {
  habit: Habit;
  position: { x: number; y: number };
}

const stageEmojis: Record<number, string> = {
  1: '🌱',
  2: '🪴',
  3: '🌿',
  4: '🌸',
  5: '✨',
};

const PlantTotem: React.FC<Props> = ({ habit, position }) => {
  const navigate = useNavigate();
  const emoji = stageEmojis[habit.stage] ?? '🌱';

  const handleClick = () => navigate(`/habit/${habit.id}`);

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'absolute',
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        cursor: 'pointer',
        animation: 'breathe 3s ease-in-out infinite',
      }}
    >
      <div
        className="glass-card"
        style={{
          padding: 8,
          borderRadius: 999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          minWidth: 80,
        }}
      >
        <div
          style={{
            fontSize: habit.stage >= 4 ? 34 : 28,
            filter: 'drop-shadow(0 0 12px rgba(244,213,141,0.7))',
          }}
        >
          {emoji}
        </div>
        <div style={{ fontSize: 11, textAlign: 'center', maxWidth: 90 }}>{habit.title}</div>
        <div style={{ transform: 'scale(0.7)' }}>
          <HabitStreakRing streak={habit.streak} />
        </div>
      </div>
    </div>
  );
};

export default PlantTotem;
