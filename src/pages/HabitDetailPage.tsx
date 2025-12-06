import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchHabits, completeHabitToday } from '../api/client';
import type { Habit } from '../types';
import HabitStreakRing from '../components/common/HabitStreakRing';
import CrescentButton from '../components/common/CrescentButton';

const HabitDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [habit, setHabit] = useState<Habit | null>(null);

  useEffect(() => {
    fetchHabits().then((all) => {
      const found = all.find((h) => h.id === Number(id));
      if (found) setHabit(found);
    });
  }, [id]);

  const handleComplete = async () => {
    if (!habit) return;
    const updated = await completeHabitToday(habit.id);
    setHabit(updated);
  };

  if (!habit) {
    return (
      <div style={{ marginTop: 40, textAlign: 'center', color: '#9ca3af' }}>
        The path to this plant is hidden.
      </div>
    );
  }

  return (
    <div style={{ marginTop: 12 }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          border: 'none',
          background: 'transparent',
          color: '#9ca3af',
          fontSize: 13,
          marginBottom: 10,
          cursor: 'pointer',
        }}
      >
        ← Back to garden
      </button>
      <div className="glass-card" style={{ padding: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 600 }}>{habit.title}</div>
            <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 4 }}>{habit.description}</div>
          </div>
          <div>
            <HabitStreakRing streak={habit.streak} />
          </div>
        </div>

        <div
          style={{
            marginTop: 18,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <div style={{ fontSize: 13, fontStyle: 'italic', lineHeight: 1.6 }}>
            "This plant remembers every small promise you kept beneath the moon."
          </div>
          <div style={{ fontSize: 13, color: '#9ca3af' }}>
            Stage: {habit.stage} / 5 • Streak: {habit.streak} days
          </div>
        </div>

        <div style={{ marginTop: 20, display: 'flex', gap: 10, alignItems: 'center' }}>
          <CrescentButton
            label={habit.isCompletedToday ? 'Already tended today' : 'Complete today'}
            icon={<span>🌙</span>}
            disabled={habit.isCompletedToday}
            onClick={handleComplete}
          />
        </div>
      </div>
    </div>
  );
};

export default HabitDetailPage;
