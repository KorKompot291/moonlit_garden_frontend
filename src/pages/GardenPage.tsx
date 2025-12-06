import React, { useEffect, useState } from 'react';
import { fetchHabits, completeHabitToday } from '../api/client';
import type { Habit } from '../types';
import GardenScene from '../components/garden/GardenScene';

const GardenPage: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHabits()
      .then((data) => setHabits(data))
      .finally(() => setLoading(false));
  }, []);

  const handleHabitCompleted = async (habitId: number) => {
    try {
      const updated = await completeHabitToday(habitId);
      setHabits((prev) => prev.map((h) => (h.id === updated.id ? updated : h)));
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div style={{ marginTop: 40, textAlign: 'center', color: '#9ca3af' }}>
        Waking the garden...
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginTop: 10, paddingLeft: 4 }}>
        <div style={{ fontSize: 18, fontWeight: 600 }}>Your moonlit garden</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>
          Each plant echoes a habit you care for.
        </div>
      </div>
      <GardenScene habits={habits} onHabitCompleted={handleHabitCompleted} />
    </div>
  );
};

export default GardenPage;
