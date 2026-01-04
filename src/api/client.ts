import axios from "axios";
import type { GardenState } from "../types/garden";

// --------------------------------------------------
// base axios instance
// --------------------------------------------------

export const apiClient = axios.create({
  baseURL: "/api",
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
// GARDEN
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
// HABITS (оставляем как есть / пример)
// --------------------------------------------------

export async function checkInHabit(habitId: number): Promise<void> {
  try {
    await apiClient.post(`/habits/${habitId}/checkin`);
  } catch (error) {
    handleError(error);
  }
}
