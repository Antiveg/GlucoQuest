"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Utensils,
  Droplet,
  Apple,
  Syringe,
  NotebookText,
  ImageOff,
} from "lucide-react";
import { format, addDays, subDays } from "date-fns";
import { MealWithFood } from "@/types/meal";
import { useUserMealsWithFoodsByUserId } from "@/lib/client-queries/meals-with-foods";
import Loading from "@/components/loading";
import ErrorBox from "@/components/error-box";

// --- MOCK DATA ---
// const MOCK_LOGGED_MEALS: MealWithFood[] = [
//   {
//     id: 1,
//     user_id: 101,
//     name: "Breakfast",
//     time: "2025-06-27T08:15:00Z",
//     photoUrl: "https://placehold.co/600x400/9BBBFC/000000?text=Oatmeal",
//     foods: [
//       {
//         id: 11,
//         meal_id: 1,
//         name: "Oatmeal, 1 cup",
//         grams: 240,
//         carbs: 45,
//         created_at: "2025-06-27T07:00:00Z",
//       },
//       {
//         id: 12,
//         meal_id: 1,
//         name: "Banana, medium",
//         grams: 118,
//         carbs: 27,
//         created_at: "2025-06-27T07:00:00Z",
//       },
//       {
//         id: 13,
//         meal_id: 1,
//         name: "Milk, 1/2 cup",
//         grams: 122,
//         carbs: 6,
//         created_at: "2025-06-27T07:00:00Z",
//       },
//     ],
//     totalCarbs: 78,
//     insulinDose: 7.8,
//     notes:
//       "A bit sweet today, maybe less banana next time. Felt energetic afterwards.",
//     created_at: "2025-06-27T08:20:00Z",
//   },
//   {
//     id: 2,
//     user_id: 101,
//     name: "Lunch",
//     time: "2025-06-27T12:45:00Z",
//     photoUrl: "https://placehold.co/600x400/D9EFF7/000000?text=Chicken+Salad",
//     foods: [
//       {
//         id: 21,
//         meal_id: 2,
//         name: "Grilled Chicken, 150g",
//         grams: 150,
//         carbs: 0,
//         created_at: "2025-06-27T11:00:00Z",
//       },
//       {
//         id: 22,
//         meal_id: 2,
//         name: "Mixed Greens Salad",
//         grams: 100,
//         carbs: 5,
//         created_at: "2025-06-27T11:00:00Z",
//       },
//       {
//         id: 23,
//         meal_id: 2,
//         name: "Vinaigrette Dressing",
//         grams: 30,
//         carbs: 3,
//         created_at: "2025-06-27T11:00:00Z",
//       },
//       {
//         id: 24,
//         meal_id: 2,
//         name: "Apple, small",
//         grams: 150,
//         carbs: 20,
//         created_at: "2025-06-27T11:00:00Z",
//       },
//     ],
//     totalCarbs: 28,
//     insulinDose: 3.0,
//     notes: "Light and refreshing lunch. BG was stable.",
//     created_at: "2025-06-27T12:50:00Z",
//   },
//   {
//     id: 3,
//     user_id: 101,
//     name: "Dinner",
//     time: "2025-06-27T18:30:00Z",
//     photoUrl: "https://placehold.co/600x400/D9EFF7/000000?text=Chicken+Salad",
//     foods: [
//       {
//         id: 31,
//         meal_id: 3,
//         name: "Salmon Fillet, 120g",
//         grams: 120,
//         carbs: 0,
//         created_at: "2025-06-27T17:00:00Z",
//       },
//       {
//         id: 32,
//         meal_id: 3,
//         name: "Quinoa, 1 cup",
//         grams: 185,
//         carbs: 39,
//         created_at: "2025-06-27T17:00:00Z",
//       },
//       {
//         id: 33,
//         meal_id: 3,
//         name: "Steamed Broccoli",
//         grams: 91,
//         carbs: 10,
//         created_at: "2025-06-27T17:00:00Z",
//       },
//     ],
//     totalCarbs: 49,
//     insulinDose: 5.2,
//     notes: "",
//     created_at: "2025-06-27T18:35:00Z",
//   },
// ];

export default function DailyMealLogPage() {
  // const [meals, setMeals] = useState<MealWithFood[]>(MOCK_LOGGED_MEALS);

  const [currentDate, setCurrentDate] = useState(new Date(Date.UTC(2025, 5, 13, 0, 0, 0)));
  const { data: meals, isLoading : MealsWithFoodsLoading, isError, error } = useUserMealsWithFoodsByUserId(currentDate.toISOString())

  if(MealsWithFoodsLoading) return <Loading message="Loading User Meals with Foods..."/>
  if(isError) return <ErrorBox error={error}/>

  return (
    <div className="min-h-screen w-full bg-[#F0F8FF] font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-black">Daily Meal Log</h1>
            <div className="flex items-center gap-2 mt-2">
              <Button
                onClick={() => setCurrentDate(subDays(currentDate, 1))}
                variant="outline"
                className="h-10 w-10 p-0 rounded-lg border-2 border-black bg-white"
              >
                <ChevronLeft />
              </Button>
              <span className="text-lg font-semibold text-gray-700">
                {format(currentDate, "MMMM d, yyyy")}
              </span>
              <Button
                onClick={() => setCurrentDate(addDays(currentDate, 1))}
                variant="outline"
                className="h-10 w-10 p-0 rounded-lg border-2 border-black bg-white"
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
          <a href="/dashboard/meal-planner">
            <Button className="w-full md:w-auto bg-[#4741A6] text-white font-bold text-md h-12 rounded-lg border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-[#3b368a] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all">
              <Plus className="mr-2 h-5 w-5" /> Log New Meal
            </Button>
          </a>
        </header>

        <div className="space-y-8">
          {meals && meals.length > 0 ? (
            meals.map((meal) => <MealLogCard key={meal.id} meal={meal} />)
          ) : (
            <Card className="bg-white rounded-2xl border-2 border-black shadow-[8px_8px_0px_#000] p-8 text-center">
              <Utensils className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-bold">No Meals Logged Today</h3>
              <p className="text-gray-500">Log a new meal to see it here!</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

const MealLogCard = ({meal} : {meal : MealWithFood}) => {
  return (
    <Card className="bg-white rounded-2xl border-2 border-black shadow-[8px_8px_0px_#000] overflow-hidden">
      <CardHeader className="bg-[#D9EFF7] p-4 border-b-2 border-black">
        <CardTitle className="text-2xl font-bold text-black flex justify-between items-center">
          <span>{meal.name}</span>
          <span className="text-lg font-medium text-gray-700">{format(meal.time, "dd/MM/yyyy HH:mm")}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Meal Photo */}
        <div className="md:col-span-2 md:p-0 p-6 pb-0">
          {meal.photoUrl ? (
            <img
              src={meal.photoUrl}
              alt={`Photo of ${meal.name}`}
              className="w-full h-64 object-cover rounded-xl border-2 border-black"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src =
                  "https://placehold.co/600x400/cccccc/000000?text=Image+Error";
              }}
            />
          ) : (
            <div className="w-full h-64 flex flex-col items-center justify-center bg-gray-100 rounded-xl border-2 border-dashed border-gray-400">
              <ImageOff className="h-12 w-12 text-gray-400" />
              <p className="text-gray-500 mt-2 font-semibold">No Photo</p>
            </div>
          )}
        </div>

        <div className="md:col-span-3 p-6 pt-0 md:pt-0">
          <div className="mb-4">
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <Apple size={18} />
              Foods
            </h4>
            <ul className="list-disc list-inside bg-gray-50 p-3 rounded-lg border border-gray-200">
              {meal.foods.map((food, index) => (
                <li key={index} className="text-gray-800">
                  {food.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-yellow-100 p-3 rounded-xl border-2 border-black">
              <p className="font-bold text-sm text-yellow-900 flex items-center gap-1">
                <Droplet size={14} />
                Carbs
              </p>
              <p className="font-extrabold text-2xl">{meal.totalCarbs}g</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-xl border-2 border-black">
              <p className="font-bold text-sm text-purple-900 flex items-center gap-1">
                <Syringe size={14} />
                Insulin
              </p>
              <p className="font-extrabold text-2xl">{meal.insulinDose}u</p>
            </div>
          </div>

          {meal.notes && (
            <div>
              <h4 className="font-bold mb-2 flex items-center gap-2">
                <NotebookText size={18} />
                Notes
              </h4>
              <p className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-700 italic">
                &quot;{meal.notes}&quot;
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
