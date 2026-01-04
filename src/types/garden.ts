export type Achievement = {
  code: string;
  variant_id: string;
  unlocked_at?: string;
};

export type Plant = {
  id: number;
  species: string;
  skin_id: string;
  growth_stage: number;
  growth_points: number;
  is_wilted: boolean;
  is_covered: boolean;
};

export type GardenItem = {
  habit_id: number;
  habit_name: string;
  habit_status: "active" | "paused" | "completed";
  plant: Plant;
  achievements: Achievement[];
};

export type GardenState = {
  garden: GardenItem[];
};
