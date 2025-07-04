export interface User {
  id: number;
  email: string;
  password: string; // hashed password
  ic_ratio?: number; // insulin-to-carb ratio (grams of carbs per unit of insulin), optional
  created_at: string; // ISO timestamp string
}

export interface GlucoseReadingInput {
  time: string; // ISO timestamp string
  glucose: number; // blood glucose level in mg/dL
  tag: string; // optional contextual tag
  notes?: string;
}

export interface GlucoseReading extends GlucoseReadingInput {
  id: number;
  userId: number;
  createdAt: string;
}

export interface Meal {
  id: number;
  userId: number;
  name: string; // meal name, optional
  time: string;
  photoUrl: string;
  totalCarbs: number; // total carbs in grams
  insulinDose: number; // insulin units for the meal
  notes?: string;
  createdAt: string;
}

export interface Food {
  id: number;
  mealId: number;
  name: string;
  grams: number;
  carbs: number;
  createdAt: string;
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

export interface CgmDevice extends CgmDeviceInput {
  id: number;
  userId: number;
}

export interface CgmDeviceInput {
  deviceId: string;
  deviceName?: string;
  connectedAt: string;
  lastSyncAt?: string;
  isConnected?: boolean;
}

export interface Notification {
  id: number;
  userId: number;
  title: string;
  description: string;
  createdAt: string;
}
