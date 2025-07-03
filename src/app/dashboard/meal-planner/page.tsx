"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Droplet,
  Utensils,
  Search,
  Camera,
  Calculator,
  Syringe,
  Trash2,
  CheckCircle2,
  X,
  Edit,
  Save,
  Undo2,
  Bell,
  Calendar,
  ClipboardList,
} from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

const MOCK_FOOD_DB = [
  { id: 1, name: "Apple, medium", carbs: 25, servings: 1 },
  { id: 2, name: "Banana, medium", carbs: 27, servings: 1 },
  { id: 3, name: "Bread, 1 slice", carbs: 15, servings: 1 },
  { id: 4, name: "Rice, white, 1 cup cooked", carbs: 45, servings: 1 },
  { id: 5, name: "Chicken Breast, 100g", carbs: 0, servings: 1 },
  { id: 6, name: "Milk, 1 cup", carbs: 12, servings: 1 },
  { id: 7, name: "Orange Juice, 1 cup", carbs: 26, servings: 1 },
  { id: 8, name: "Potato, medium", carbs: 37, servings: 1 },
  { id: 9, name: "Pasta, 1 cup cooked", carbs: 43, servings: 1 },
  { id: 10, name: "Pizza, 1 slice", carbs: 36, servings: 1 },
];

const TARGET_BG = 120; // mg/dL
const CORRECTION_FACTOR = 50; // 1 unit of insulin lowers BG by 50 mg/dL
const EAT_COUNTDOWN_MINUTES = 30;

interface FoodItemOverview {
  id: number;
  name: string;
  carbs: number;
  servings: number;
}

export default function MealPlannerPage() {
  const [mealTitle, setMealTitle] = useState("breakfast");
  const [currentBg, setCurrentBg] = useState(0);
  const [mealItems, setMealItems] = useState<FoodItemOverview[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [mealPhoto, setMealPhoto] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [icr, setIcr] = useState(10); // Insulin-to-Carb Ratio: 1 unit per 10g
  const [isEditingIcr, setIsEditingIcr] = useState(false);
  const [tempIcr, setTempIcr] = useState(icr);
  const [doseConfirmed, setDoseConfirmed] = useState(false);
  const [doseTimestamp, setDoseTimestamp] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [reminderSet, setReminderSet] = useState<number>(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Derived State & Calculations
  const totalCarbs = useMemo(
    () => mealItems.reduce((sum, item) => sum + item.carbs * item.servings, 0),
    [mealItems]
  );

  const doseCalculation = useMemo(() => {
    if (!totalCarbs && !currentBg)
      return { carbDose: 0, correctionDose: 0, totalDose: 0 };
    const carbDose = totalCarbs > 0 && icr > 0 ? totalCarbs / icr : 0;
    const correctionDose =
      currentBg > TARGET_BG ? (currentBg - TARGET_BG) / CORRECTION_FACTOR : 0;
    const totalDose = carbDose + correctionDose;
    return {
      carbDose: parseFloat(carbDose.toFixed(1)),
      correctionDose: parseFloat(correctionDose.toFixed(1)),
      totalDose: parseFloat(totalDose.toFixed(1)),
    };
  }, [totalCarbs, currentBg, icr]);

  const addFoodToMeal = (food: FoodItemOverview) => {
    setMealItems((prev) => [...prev, { ...food, servings: 1 }]);
    setSearchTerm("");
  };
  const updateServings = (id: number, newServings: number) => {
    setMealItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, servings: Math.max(0, newServings) } : item
      )
    );
  };
  const removeFoodFromMeal = (id: number) => {
    setMealItems((prev) => prev.filter((item) => item.id !== id));
  };
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMealPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleConfirmDose = () => {
    setDoseConfirmed(true);
    const now = Date.now();
    setDoseTimestamp(now);
    setElapsedTime(0);
    timerRef.current = setInterval(() => {
      setElapsedTime(Date.now() - now);
    }, 1000);
  };

  const handleUndoDose = () => {
    setDoseConfirmed(false);
    setDoseTimestamp(0);
    setElapsedTime(0);
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
    }
  };

  const handleSetReminder = (hours: number) => {
    setReminderSet(hours);
    setTimeout(() => {
      console.log(
        `REMINDER: Time to check your blood glucose! It has been ${hours} hour(s).`
      );
      //trigger a system notification.
    }, hours * 60 * 60 * 1000);
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const filteredFood = useMemo(() => {
    if (!searchTerm) return [];
    return MOCK_FOOD_DB.filter((food) =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const countdownProgress = Math.min(
    (elapsedTime / (EAT_COUNTDOWN_MINUTES * 60 * 1000)) * 100,
    100
  );
  const timeToEat = EAT_COUNTDOWN_MINUTES * 60 - Math.floor(elapsedTime / 1000);

  return (
    <div className="min-h-screen w-full bg-[#F0F8FF] font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex justify-between">
          <div>
            <h1 className="text-3xl font-bold text-black flex items-center gap-3">
              <Utensils /> Meal Planner
            </h1>
            <p className="text-gray-600">
              Log your meal and calculate your insulin dose.
            </p>
          </div>
          <div>
            <Link
              href="/dashboard/meal-planner/daily-meals"
              className="w-full p-6 md:w-auto bg-[#4741A6] text-white font-bold text-md h-12 rounded-lg border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-[#3b368a] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center"
            >
              <Calendar className="mr-2 h-5 w-5" />
              View all meals
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white rounded-2xl border-2 border-black shadow-[8px_8px_0px_#000]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList />
                  Meal Title
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {["Breakfast", "Lunch", "Dinner", "Snack"].map((title) => (
                    <button
                      key={title}
                      onClick={() => setMealTitle(title)}
                      className={`w-full h-12 font-bold text-md rounded-lg border-2 border-black shadow-[4px_4px_0px_#000] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center ${
                        mealTitle === title
                          ? "bg-[#4741A6] text-white"
                          : "bg-white text-black hover:bg-gray-100"
                      }`}
                      disabled={doseConfirmed}
                    >
                      {title}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white rounded-2xl border-2 border-black shadow-[8px_8px_0px_#000]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplet /> Blood Glucose Status
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row items-center gap-4">
                <Input
                  type="number"
                  placeholder="Enter current BG..."
                  value={currentBg}
                  onChange={(e) => setCurrentBg(Number(e.target.value))}
                  className="border-black h-12 text-lg font-bold"
                  disabled={doseConfirmed}
                />
                {currentBg && (
                  <div
                    className={`w-full sm:w-auto text-center font-bold p-3 rounded-lg border-2 border-black ${
                      currentBg > 180
                        ? "bg-orange-200"
                        : currentBg < 70
                        ? "bg-red-200"
                        : "bg-green-200"
                    }`}
                  >
                    {currentBg > 180
                      ? "High"
                      : currentBg < 70
                      ? "Low"
                      : "In Range"}{" "}
                    ({currentBg} mg/dL)
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-white rounded-2xl border-2 border-black shadow-[8px_8px_0px_#000]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search /> Log Your Meal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Input
                    placeholder="Search for food..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-black h-12 pl-10"
                    disabled={doseConfirmed}
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  {filteredFood.length > 0 && (
                    <div className="absolute z-10 w-full bg-white border-2 border-black rounded-lg mt-1 shadow-lg max-h-48 overflow-y-auto">
                      {filteredFood.map((food) => (
                        <div
                          key={food.id}
                          onClick={() => addFoodToMeal(food)}
                          className="p-3 hover:bg-gray-100 cursor-pointer border-b"
                        >
                          {food.name}{" "}
                          <span className="text-gray-500 text-sm">
                            ({food.carbs}g carbs)
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  {mealItems.length > 0 ? (
                    mealItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border"
                      >
                        <span className="flex-grow font-semibold">
                          {item.name}
                        </span>
                        <Input
                          type="number"
                          value={item.servings}
                          onChange={(e) =>
                            updateServings(item.id, parseFloat(e.target.value))
                          }
                          className="w-20 h-9 text-center border-black"
                          disabled={doseConfirmed}
                        />
                        <span className="w-24 text-right">
                          {item.carbs * item.servings}g
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500"
                          onClick={() => removeFoodFromMeal(item.id)}
                          disabled={doseConfirmed}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 py-4">
                      No food added yet.
                    </p>
                  )}
                </div>
                {totalCarbs > 0 && (
                  <p className="text-right font-bold text-xl">
                    Total Carbs: {totalCarbs}g
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="bg-white rounded-2xl border-2 border-black shadow-[8px_8px_0px_#000]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera /> Photo & Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Meal Photo</Label>
                  {mealPhoto ? (
                    <div className="relative">
                      <img
                        src={mealPhoto}
                        alt="Meal"
                        className="w-full h-32 object-cover rounded-lg border-2 border-black"
                      />
                      <Button
                        onClick={() => setMealPhoto("")}
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 bg-black/50 hover:bg-black/70 text-white rounded-full"
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  ) : (
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="border-black"
                      disabled={doseConfirmed}
                    />
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea
                    placeholder="Any details about the meal?"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="border-black min-h-[100px]"
                    disabled={doseConfirmed}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-white rounded-2xl border-2 border-black shadow-[8px_8px_0px_#000]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator /> Insulin Dose
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border">
                  <Label className="font-bold">IC Ratio</Label>
                  {isEditingIcr ? (
                    <div className="flex items-center gap-1">
                      <Input
                        type="number"
                        value={tempIcr}
                        onChange={(e) => setTempIcr(Number(e.target.value))}
                        className="w-20 h-9 border-black"
                      />
                      <Button
                        size="icon"
                        className="h-8 w-8 bg-green-500"
                        onClick={() => {
                          setIcr(tempIcr);
                          setIsEditingIcr(false);
                        }}
                      >
                        <Save size={16} />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8"
                        onClick={() => setIsEditingIcr(false)}
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">1 unit / {icr}g</span>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8"
                        onClick={() => {
                          setTempIcr(icr);
                          setIsEditingIcr(true);
                        }}
                        disabled={doseConfirmed}
                      >
                        <Edit size={16} />
                      </Button>
                    </div>
                  )}
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm">
                    Carb Dose: {doseCalculation.carbDose.toFixed(1)}u
                  </p>
                  <p className="text-sm">
                    Correction: {doseCalculation.correctionDose.toFixed(1)}u
                  </p>
                  <p className="font-bold text-3xl mt-1">
                    {doseCalculation.totalDose.toFixed(1)} units
                  </p>
                  <p className="text-sm text-gray-500">Recommended</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full h-12 bg-[#4741A6] text-white font-bold"
                  onClick={handleConfirmDose}
                  disabled={doseCalculation.totalDose <= 0 || doseConfirmed}
                >
                  <Syringe className="mr-2" /> Confirm Dose Taken
                </Button>
              </CardFooter>
            </Card>

            {doseConfirmed && (
              <Card className="bg-white rounded-2xl border-2 border-black shadow-[8px_8px_0px_#000]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 /> Dose Confirmed
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="font-semibold">
                      Time to eat countdown
                    </Label>
                    <Progress
                      value={countdownProgress}
                      className="w-full mt-1"
                    />
                    <p className="text-center font-bold text-lg mt-2">
                      {timeToEat > 0
                        ? `${Math.floor(timeToEat / 60)}m ${timeToEat % 60}s`
                        : "Ready to Eat!"}
                    </p>
                  </div>
                  <div>
                    <Label className="font-semibold">
                      Post-Meal BG Check Reminder
                    </Label>
                    {reminderSet ? (
                      <div className="p-3 text-center bg-green-100 rounded-lg font-semibold text-green-800">
                        Reminder set for {reminderSet} hour(s).
                      </div>
                    ) : (
                      <div className="flex gap-2 mt-1">
                        <Button
                          className="flex-1"
                          variant="outline"
                          onClick={() => handleSetReminder(1)}
                        >
                          <Bell size={16} className="mr-2" />1 Hour
                        </Button>
                        <Button
                          className="flex-1"
                          variant="outline"
                          onClick={() => handleSetReminder(2)}
                        >
                          <Bell size={16} className="mr-2" />2 Hours
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleUndoDose}
                  >
                    <Undo2 className="mr-2" />
                    Undo Confirmation
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
