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

export interface MealWithFood extends MealWithFoodInput {
  id: number;
  userId: number;
  createdAt: string;
}

export interface MealWithFoodInput {
  name: string;
  time: string;
  photoUrl: string;
  totalCarbs: number;
  insulinDose: number;
  notes: string;
  mealFoods: FoodWithServing[];
}

export interface MealWithoutFoodDetailsInput {
  name: string;
  time: string;
  photoUrl: string;
  totalCarbs: number;
  insulinDose: number;
  notes: string;
  mealFoods: {
    foodId: number
    servings: number
  }[];
}
