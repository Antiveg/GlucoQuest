export interface Food extends FoodInput {
  id: number;
}

export interface FoodInput {
  name: string
  grams: number
  carbs: number
  createdAt: string
}

export interface FoodWithServing extends Food {
  servings: number
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
  foods: FoodWithServing[];
}
