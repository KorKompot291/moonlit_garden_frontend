import React from 'react';
import type { Habit } from '../../types';
import Modal from '../common/Modal';
import HabitStreakRing from '../common/HabitStreakRing';

interface Props {
  open: boolean;
  onClose: () => void;
  habits: Habit[];
  onHabitCompleted: (habitId: number) => void;
}

const HabitModal: React.FC<Props> = ({ open, onClose, habits, onHabitCompleted }) => {
  const handleToggle = (habit: Habit) => {
    if (!habit.isCompletedToday) {
      onHabitCompleted(habit.id);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Today's care rituals">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {habits.map((habit) => (
          <button
            key={habit.id}
            onClick={() => handleToggle(habit)}
            style={{
              border: 'none',
              background: 'transparent',
              textAlign: 'left',
              padding: 0,
              cursor: 'pointer',
            }}
          >
            <div
              className="glass-card--soft"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: 10,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 999,
                  border: '1px solid rgba(156,163,175,0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  background: habit.isCompletedToday
                    ? 'radial-gradient(circle, #f4d58d, #b8a9ff)'
                    : 'rgba(15,23,42,0.9)',
                  boxShadow: habit.isCompletedToday
                    ? '0 0 16px rgba(244,213,141,0.7)'
                    : 'none',
                }}
              >
                {habit.isCompletedToday ? '🌕' : '🌑'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{habit.title}</div>
                {habit.description && (
                  <div style={{ fontSize: 12, color: '#9ca3af' }}>{habit.description}</div>
                )}
                <div
                  style={{
                    marginTop: 6,
                    width: '100%',
                    height: 8,
                    borderRadius: 999,
                    background: 'rgba(15,23,42,0.9)',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(90deg, #6fffe9, #b8a9ff, #f4d58d)',
                      width: `${Math.min(habit.streak, 30) / 30 * 100}%`,
                      boxShadow: '0 0 12px rgba(111,255,233,0.8)',
                    }}
                  />
                </div>
              </div>
              <div style={{ transform: 'scale(0.7)' }}>
                <HabitStreakRing streak={habit.streak} />
              </div>
            </div>
          </button>
        ))}
      </div>
    </Modal>
  );
};

export default HabitModal;
