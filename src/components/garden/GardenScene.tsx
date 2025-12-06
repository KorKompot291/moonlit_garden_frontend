import React, { useMemo, useState } from 'react';
import type { Habit } from '../../types';
import CrescentButton from '../common/CrescentButton';
import HabitModal from '../habits/HabitModal';

interface Props {
  habits: Habit[];
  onHabitCompleted: (habitId: number) => void;
}

const GardenScene: React.FC<Props> = ({ habits, onHabitCompleted }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const positions = useMemo(() => {
    const base = [
      { x: 24, y: 34 },
      { x: 68, y: 38 },
      { x: 40, y: 58 },
      { x: 62, y: 64 },
      { x: 18, y: 62 },
      { x: 50, y: 44 },
      { x: 30, y: 46 },
      { x: 78, y: 54 },
    ];
    return habits.map((_, index) => base[index % base.length]);
  }, [habits]);

  const incompleteCount = habits.filter((h) => !h.isCompletedToday).length;

  return (
    <>
      <div
        className="glass-card"
        style={{
          position: 'relative',
          marginTop: 12,
          padding: 16,
          minHeight: 260,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '40% 10% -10%',
            background:
              'radial-gradient(circle at 50% 0%, rgba(111,255,233,0.16), transparent 60%), ' +
              'radial-gradient(circle at 0% 80%, rgba(31,64,55,0.8), transparent 70%), ' +
              'radial-gradient(circle at 100% 80%, rgba(45,38,69,0.8), transparent 70%)',
            opacity: 0.9,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(to top, rgba(2,6,23,0.95), transparent 40%), ' +
              'radial-gradient(circle at 10% 0%, rgba(148,163,184,0.25), transparent 55%), ' +
              'radial-gradient(circle at 90% 0%, rgba(148,163,184,0.18), transparent 55%)',
            mixBlendMode: 'screen',
            opacity: 0.8,
          }}
        />
        <div style={{ position: 'relative', zIndex: 2, height: 220 }}>
          {habits.map((habit, index) => (
            <React.Fragment key={habit.id}>
              <div
                style={{
                  position: 'absolute',
                  left: `${positions[index].x}%`,
                  top: `${positions[index].y + 10}%`,
                  width: 70,
                  height: 16,
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle, rgba(15,23,42,0.9) 0, transparent 70%)',
                  opacity: 0.8,
                  filter: 'blur(4px)',
                }}
              />
            </React.Fragment>
          ))}
          {habits.map((habit, index) => (
            <React.Fragment key={habit.id}>
              {/* @ts-ignore */}
              <div style={{ position: 'absolute', left: 0, top: 0 }} />
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="garden-floating-cta">
        <CrescentButton
          label="Track today"
          badge={incompleteCount ? `${incompleteCount} left` : 'All tended'}
          icon={<span>🌙</span>}
          onClick={() => setModalOpen(true)}
        />
      </div>
      <HabitModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        habits={habits}
        onHabitCompleted={onHabitCompleted}
      />
    </>
  );
};

export default GardenScene;
