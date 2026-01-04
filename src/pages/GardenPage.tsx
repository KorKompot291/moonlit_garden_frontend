import React, { useEffect, useState } from 'react';
import { fetchHabits, completeHabitToday, getGardenState } from '../api/client';
import type { Habit } from '../types';
import type { GardenState } from '../types/garden';
import GardenScene from '../components/garden/GardenScene';

const GardenPage: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [gardenState, setGardenState] = useState<GardenState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchHabits(),
      getGardenState(),
    ])
      .then(([habitsData, gardenData]) => {
        setHabits(habitsData);
        setGardenState(gardenData);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleHabitCompleted = async (habitId: number) => {
    try {
      const updated = await completeHabitToday(habitId);
      setHabits((prev) => prev.map((h) => (h.id === updated.id ? updated : h)));

      // обновляем garden state после чек-ина
      const garden = await getGardenState();
      setGardenState(garden);
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
        <div style={{ fontSize: 18, fontWeight: 600 }}>
          Your moonlit garden
        </div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>
          Each plant echoes a habit you care for.
        </div>
      </div>

      {/* ===== DEBUG (ВРЕМЕННО) ===== */}
      <div
        style={{
          marginTop: 12,
          padding: 12,
          background: '#0b1220',
          color: '#9ca3af',
          fontSize: 12,
          maxHeight: 300,
          overflow: 'auto',
          borderRadius: 6,
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: 6 }}>
          DEBUG: /garden/state
        </div>
        <pre style={{ whiteSpace: 'pre-wrap' }}>
          {JSON.stringify(gardenState, null, 2)}
        </pre>
      </div>
      {/* ===== /DEBUG ===== */}

      <GardenScene
        habits={habits}
        onHabitCompleted={handleHabitCompleted}
      />
    </div>
  );
};

export default GardenPage;
