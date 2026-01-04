import axios from "axios";
import type { GardenState } from "../types/garden";

// --------------------------------------------------
// base URL (ВОЗВРАЩАЕМ СТАРУЮ ЛОГИКУ)
// --------------------------------------------------

const API_BASE_URL = import.meta.env.VITE_API_URL;

// --------------------------------------------------
// axios instance
// --------------------------------------------------

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// --------------------------------------------------
// helpers
// --------------------------------------------------

function handleError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    throw new Error(
      error.response?.data?.detail ||
        error.response?.data?.message ||
        "API error"
    );
  }
  throw error;
}

// --------------------------------------------------
// GARDEN (НОВОЕ)
// --------------------------------------------------

export async function getGardenState(): Promise<GardenState> {
  try {
    const res = await apiClient.get<GardenState>("/garden/state");
    return res.data;
  } catch (error) {
    handleError(error);
  }
}

// --------------------------------------------------
// HABITS (СТАРОЕ, НЕ ТРОГАЕМ)
// --------------------------------------------------

export async function fetchHabits() {
  try {
    const res = await apiClient.get("/habits");
    return res.data;
  } catch (error) {
    handleError(error);
  }
}

export async function completeHabitToday(habitId: number) {
  try {
    const res = await apiClient.post(`/habits/${habitId}/checkin`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
}
