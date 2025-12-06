export type HabitStage = 1 | 2 | 3 | 4 | 5;

export interface Habit {
  id: number;
  title: string;
  description?: string;
  streak: number;
  stage: HabitStage;
  isCompletedToday: boolean;
  lastCompletedAt?: string;
}

export type ArtifactRarity = 'common' | 'rare' | 'legendary' | 'mythic';

export interface Artifact {
  id: number;
  name: string;
  rarity: ArtifactRarity;
  description: string;
  collectedAt: string;
  type: 'crystal' | 'mushroom' | 'moth' | 'talisman' | 'rune';
  isLocked: boolean;
}

export type MoonPhaseId =
  | 'new'
  | 'waxing-crescent'
  | 'first-quarter'
  | 'waxing-gibbous'
  | 'full'
  | 'waning-gibbous'
  | 'last-quarter'
  | 'waning-crescent';

export interface MoonPhase {
  id: MoonPhaseId;
  label: string;
  emoji: string;
  dayInCycle: number;
  cycleLength: number;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'auto';
  syncWithMoon: boolean;
  notifications: {
    dailyReminder: boolean;
    fullMoonAlert: boolean;
    streakMilestone: boolean;
    artifactFound: boolean;
  };
  soundsEnabled: boolean;
  ambienceEnabled: boolean;
  reduceMotion: boolean;
}

export interface UserProfile {
  id: number;
  username: string;
  companion: 'moth' | 'fox' | 'wisp';
}
