import type { Habit, Artifact, MoonPhase, UserSettings, UserProfile } from '../types';

const API_BASE = '/api';

let accessToken: string | null = null;

export function setToken(token: string | null) {
  accessToken = token;
}

export function setTokenFromStorage() {
  const token = window.localStorage.getItem('access_token');
  if (token) {
    setToken(token);
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed with status ${res.status}`);
  }

  return res.json() as Promise<T>;
}

// NOTE: Сейчас здесь используются моковые вызовы. Когда бекенд будет готов,
// эти функции можно заменить реальными эндпоинтами или внутри них убрать mock.

export async function fetchHabits(): Promise<Habit[]> {
  // return request<Habit[]>('/habits');
  const { getMockHabits } = await import('./mock');
  return getMockHabits();
}

export async function fetchArtifacts(): Promise<Artifact[]> {
  const { getMockArtifacts } = await import('./mock');
  return getMockArtifacts();
}

export async function fetchMoonPhase(): Promise<MoonPhase> {
  const { getMockMoonPhase } = await import('./mock');
  return getMockMoonPhase();
}

export async function fetchSettings(): Promise<UserSettings> {
  const { getMockSettings } = await import('./mock');
  return getMockSettings();
}

export async function fetchProfile(): Promise<UserProfile> {
  const { getMockProfile } = await import('./mock');
  return getMockProfile();
}

export async function completeHabitToday(habitId: number): Promise<Habit> {
  // Здесь будет реальный PATCH/POST на бекенд.
  const { completeHabitMock } = await import('./mock');
  return completeHabitMock(habitId);
}
