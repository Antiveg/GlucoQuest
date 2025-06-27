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

// --- MOCK DATA ---
const MOCK_LOGGED_MEALS = [
  {
    id: 1,
    name: "Breakfast",
    time: "08:15",
    photoUrl: "https://placehold.co/600x400/9BBBFC/000000?text=Oatmeal",
    foods: [
      { name: "Oatmeal, 1 cup", carbs: 45 },
      { name: "Banana, medium", carbs: 27 },
      { name: "Milk, 1/2 cup", carbs: 6 },
    ],
    totalCarbs: 78,
    insulinDose: 7.8,
    notes:
      "A bit sweet today, maybe less banana next time. Felt energetic afterwards.",
  },
  {
    id: 2,
    name: "Lunch",
    time: "12:45",
    photoUrl: "https://placehold.co/600x400/D9EFF7/000000?text=Chicken+Salad",
    foods: [
      { name: "Grilled Chicken, 150g", carbs: 0 },
      { name: "Mixed Greens Salad", carbs: 5 },
      { name: "Vinaigrette Dressing", carbs: 3 },
      { name: "Apple, small", carbs: 20 },
    ],
    totalCarbs: 28,
    insulinDose: 3.0,
    notes: "Light and refreshing lunch. BG was stable.",
  },
  {
    id: 3,
    name: "Dinner",
    time: "18:30",
    photoUrl: null, // No photo for this meal
    foods: [
      { name: "Salmon Fillet, 120g", carbs: 0 },
      { name: "Quinoa, 1 cup", carbs: 39 },
      { name: "Steamed Broccoli", carbs: 10 },
    ],
    totalCarbs: 49,
    insulinDose: 5.2,
    notes: "", // No notes for this meal
  },
];

export default function DailyMealLogPage() {
  const [currentDate, setCurrentDate] = useState(
    new Date("2025-06-13T12:00:00Z")
  );

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
          <a href="/dashboard/planner">
            <Button className="w-full md:w-auto bg-[#4741A6] text-white font-bold text-md h-12 rounded-lg border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-[#3b368a] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all">
              <Plus className="mr-2 h-5 w-5" /> Log New Meal
            </Button>
          </a>
        </header>

        <div className="space-y-8">
          {MOCK_LOGGED_MEALS.length > 0 ? (
            MOCK_LOGGED_MEALS.map((meal) => (
              <MealLogCard key={meal.id} meal={meal} />
            ))
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

interface FoodItem {
  name: string;
  carbs: number;
}

interface Meal {
  id: number;
  name: string;
  time: string;
  photoUrl: string | null;
  foods: FoodItem[];
  totalCarbs: number;
  insulinDose: number;
  notes: string;
}

interface MealLogCardProps {
  meal: Meal;
}

const MealLogCard: React.FC<MealLogCardProps> = ({ meal }) => {
  return (
    <Card className="bg-white rounded-2xl border-2 border-black shadow-[8px_8px_0px_#000] overflow-hidden">
      <CardHeader className="bg-[#D9EFF7] p-4 border-b-2 border-black">
        <CardTitle className="text-2xl font-bold text-black flex justify-between items-center">
          <span>{meal.name}</span>
          <span className="text-lg font-medium text-gray-700">{meal.time}</span>
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
