import type { Habit, Artifact, MoonPhase, UserSettings, UserProfile } from '../types';

const API_BASE =
  (import.meta.env.VITE_API_BASE as string | undefined) // например: http://127.0.0.1:8000/api
  ?? '/api'; // если настроишь прокси в vite

let accessToken: string | null = null;

export function setToken(token: string | null) {
  accessToken = token;
}

export function setTokenFromStorage() {
  const token = window.localStorage.getItem('access_token');
  if (token) setToken(token);
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

  // 204 без тела — возвращаем undefined
  if (res.status === 204) return undefined as T;

  return res.json() as Promise<T>;
}

export async function fetchHabits(): Promise<Habit[]> {
  return request<Habit[]>('/habits/');
}

export async function completeHabitToday(habitId: number): Promise<Habit> {
  // у тебя в бэке есть POST /api/habits/{habit_id}/checkin
  const resp = await request<{ habit: Habit } | Habit>(`/habits/${habitId}/checkin`, { method: 'POST' });
  // если бэк возвращает {habit: ...} — нормализуем
  return (resp as any).habit ?? (resp as Habit);
}

// Ниже — включай только если эти эндпоинты реально есть в бэке.
// Если нет — временно оставь мок или закомментируй вызовы.

export async function fetchArtifacts(): Promise<Artifact[]> {
  return request<Artifact[]>('/artifacts/');
}

export async function fetchMoonPhase(): Promise<MoonPhase> {
  return request<MoonPhase>('/lunar/phase');
}

export async function fetchSettings(): Promise<UserSettings> {
  return request<UserSettings>('/users/settings');
}

export async function fetchProfile(): Promise<UserProfile> {
  return request<UserProfile>('/users/me');
}
