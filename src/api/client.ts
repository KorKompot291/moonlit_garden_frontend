import axios from "axios";
import type { GardenState } from "../types/garden";

// --------------------------------------------------
// base URL
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

// ==================================================
// HABITS
// ==================================================

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

// ==================================================
// GARDEN
// ==================================================

export async function getGardenState(): Promise<GardenState> {
  try {
    const res = await apiClient.get<GardenState>("/garden/state");
    return res.data;
  } catch (error) {
    handleError(error);
  }
}

// ==================================================
// ARTIFACTS
// ==================================================

export async function fetchArtifacts() {
  try {
    const res = await apiClient.get("/artifacts");
    return res.data;
  } catch (error) {
    handleError(error);
  }
}

// ==================================================
// LUNAR
// ==================================================

export async function fetchMoonPhase() {
  try {
    const res = await apiClient.get("/lunar/phase");
    return res.data;
  } catch (error) {
    handleError(error);
  }
}

// ==================================================
// SETTINGS
// ==================================================

export async function fetchSettings() {
  try {
    const res = await apiClient.get("/settings");
    return res.data;
  } catch (error) {
    handleError(error);
  }
}
