import type { Habit, Artifact, MoonPhase, UserSettings, UserProfile } from '../types';

let habits: Habit[] = [
  {
    id: 1,
    title: 'Evening meditation',
    description: '10 quiet minutes with your breath.',
    streak: 14,
    stage: 4,
    isCompletedToday: false,
    lastCompletedAt: '2025-12-05T21:00:00Z',
  },
  {
    id: 2,
    title: 'Water intake',
    description: 'Drink 6–8 cups of water.',
    streak: 5,
    stage: 2,
    isCompletedToday: true,
    lastCompletedAt: '2025-12-06T09:30:00Z',
  },
  {
    id: 3,
    title: 'Reading ritual',
    description: 'Read 10 pages of a book you love.',
    streak: 22,
    stage: 5,
    isCompletedToday: false,
    lastCompletedAt: '2025-12-05T23:00:00Z',
  },
];

export function getMockHabits(): Habit[] {
  return habits;
}

export function completeHabitMock(habitId: number): Habit {
  habits = habits.map((h) => {
    if (h.id === habitId) {
      const updated: Habit = {
        ...h,
        isCompletedToday: true,
        streak: h.streak + 1,
        lastCompletedAt: new Date().toISOString(),
        stage:
          h.streak + 1 >= 22
            ? 5
            : h.streak + 1 >= 15
            ? 4
            : h.streak + 1 >= 8
            ? 3
            : h.streak + 1 >= 4
            ? 2
            : 1,
      };
      return updated;
    }
    return h;
  });

  const found = habits.find((h) => h.id === habitId);
  if (!found) {
    throw new Error('Habit not found');
  }
  return found;
}

export function getMockArtifacts(): Artifact[] {
  return [
    {
      id: 1,
      name: 'Moonstone Crystal',
      rarity: 'rare',
      description: 'Channels lunar energy into gentle focus.',
      collectedAt: '2025-11-15T20:00:00Z',
      type: 'crystal',
      isLocked: false,
    },
    {
      id: 2,
      name: 'Crimson Cap Ring',
      rarity: 'common',
      description: 'A friendly mushroom circle, softly glowing.',
      collectedAt: '2025-11-10T20:00:00Z',
      type: 'mushroom',
      isLocked: false,
    },
    {
      id: 3,
      name: 'Silent Moth',
      rarity: 'legendary',
      description: 'Appears only on the quietest nights.',
      collectedAt: '2025-10-31T20:00:00Z',
      type: 'moth',
      isLocked: false,
    },
    {
      id: 4,
      name: 'Hidden Rune Tablet',
      rarity: 'rare',
      description: 'Its symbols rearrange under moonlight.',
      collectedAt: '2025-12-01T20:00:00Z',
      type: 'rune',
      isLocked: true,
    },
  ];
}

export function getMockMoonPhase(): MoonPhase {
  return {
    id: 'waxing-gibbous',
    label: 'Waxing Gibbous',
    emoji: '🌔',
    dayInCycle: 11,
    cycleLength: 29,
  };
}

export function getMockSettings(): UserSettings {
  return {
    theme: 'dark',
    syncWithMoon: true,
    notifications: {
      dailyReminder: true,
      fullMoonAlert: true,
      streakMilestone: true,
      artifactFound: true,
    },
    soundsEnabled: true,
    ambienceEnabled: true,
    reduceMotion: false,
  };
}

export function getMockProfile(): UserProfile {
  return {
    id: 1,
    username: 'moon-gardener',
    companion: 'moth',
  };
}
