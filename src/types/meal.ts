interface Food {
  id: number;
  meal_id: number;
  name: string;
  grams: number;
  carbs: number;
  created_at: string;
}

export interface MealWithFood {
  id: number;
  user_id: number;
  name: string;
  time: string;
  photo_url: string;
  total_carbs: number;
  insulin_dose: number;
  notes: string;
  created_at: string;
  foods: Food[];
}
