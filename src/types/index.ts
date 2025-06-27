export interface User {
  id: number;
  email: string;
  password: string; // hashed password
  ic_ratio?: number; // insulin-to-carb ratio (grams of carbs per unit of insulin), optional
  created_at: string; // ISO timestamp string
}

export interface GlucoseReading {
  id: number;
  user_id: number;
  time: string; // ISO timestamp string
  glucose: number; // blood glucose level in mg/dL
  tag: string; // optional contextual tag
  notes?: string;
  created_at: string;
}

export interface Meal {
  id: number;
  user_id: number;
  name: string; // meal name, optional
  time: string;
  photo_url: string;
  total_carbs: number; // total carbs in grams
  insulin_dose: number; // insulin units for the meal
  notes?: string;
  created_at: string;
}

export interface Food {
  id: number;
  meal_id: number;
  name: string;
  grams: number;
  carbs: number;
  created_at: string;
}

export interface Task {
  id: number;
  user_id: number;
  task: string;
  deadline: string;
  details: string;
  done: boolean;
  created_at: string;
}

export interface CgmDevice {
  id: number;
  user_id: number;
  device_id: string; // unique device serial or ID
  device_name?: string;
  connected_at: string;
  last_sync_at?: string;
}

export interface Notification {
  id: number;
  user_id: number;
  title: string;
  description?: string;
  created_at: string;
}
