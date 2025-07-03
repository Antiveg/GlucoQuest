interface Food {
  id: number;
  mealId: number;
  name: string;
  grams: number;
  carbs: number;
  createdAt: string;
}

export interface MealWithFood {
  id: number;
  userId: number;
  name: string;
  time: string;
  photoUrl: string;
  totalCarbs: number;
  insulinDose: number;
  notes: string;
  createdAt: string;
  foods: Food[];
}
