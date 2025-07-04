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
  Plus,
  ArrowRight,
  ArrowDown,
  Check,
} from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { useCreateUserFood, useDeleteUserFood, useGetUserFoods } from "@/lib/client-queries/foods";
import Loading from "@/components/loading";
import ErrorBox from "@/components/error-box";
import { Food } from "@/types/meal";
import { useGetUserById, useUpdateUser } from "@/lib/client-queries/users";
import { useUploadImages } from "@/lib/client-queries/upload-images";
import { useCreateMealWithFoods } from "@/lib/client-queries/meals-with-foods";

// const MOCK_FOOD_DB = [
//   { id: 1, name: "Apple, medium", carbs: 25, servings: 1 },
//   { id: 2, name: "Banana, medium", carbs: 27, servings: 1 },
//   { id: 3, name: "Bread, 1 slice", carbs: 15, servings: 1 },
//   { id: 4, name: "Rice, white, 1 cup cooked", carbs: 45, servings: 1 },
//   { id: 5, name: "Chicken Breast, 100g", carbs: 0, servings: 1 },
//   { id: 6, name: "Milk, 1 cup", carbs: 12, servings: 1 },
//   { id: 7, name: "Orange Juice, 1 cup", carbs: 26, servings: 1 },
//   { id: 8, name: "Potato, medium", carbs: 37, servings: 1 },
//   { id: 9, name: "Pasta, 1 cup cooked", carbs: 43, servings: 1 },
//   { id: 10, name: "Pizza, 1 slice", carbs: 36, servings: 1 },
// ];

interface FoodItemOverview extends Food {
  servings: number;
}

export default function MealPlannerPage() {
  // user input (use globally so must be at above)
  const [currentBg, setCurrentBg] = useState(0); // primarily for dose calculation
  const [mealPhotoPreview, setMealPhotoPreview] = useState<string>(""); // primarily for image preview handling
  const [doseConfirmed, setDoseConfirmed] = useState(false); // dose confirmation before/after eat

  // insert meal inputs
  const [mealTitle, setMealTitle] = useState("Breakfast");
  const [mealItems, setMealItems] = useState<FoodItemOverview[]>([]);
  const [mealPhotoFiles, setMealPhotoFile] = useState<File[]>([])
  const [doseTimestamp, setDoseTimestamp] = useState<Date|null>(null)
  const [notes, setNotes] = useState("");
  const { mutate: mutateUploadImages, isPending: uploadImagesPending } = useUploadImages()
  const { mutate: mutateCreateMealWithFoods, isPending : createMealWithFoodsPending } = useCreateMealWithFoods()
  const handleMealSubmit = () => {
    if(!doseTimestamp) return
    mutateUploadImages({
      files: mealPhotoFiles,
      context: 'user-meals'
    },{
      onSuccess: (data) => {
        const totalCarbs = mealItems.reduce((sum, item) => sum + item.carbs * item.servings, 0);
        const carbDose = totalCarbs > 0 && user.icRatio > 0 ? totalCarbs / user.icRatio : 0;
        const correctionDose = currentBg > user.targetBG ? (currentBg - user.targetBG) / user.correctionFactor : 0;
        const totalDose = carbDose + correctionDose;

        mutateCreateMealWithFoods({
          name: mealTitle,
          time: doseTimestamp.toISOString(),
          photoUrl: data.urls[0],
          totalCarbs: totalCarbs,
          insulinDose: totalDose,
          notes: notes,
          mealFoods: mealItems.map(item => ({
            servings: item.servings,
            foodId: item.id,
          }))
        },{
          onSuccess: () => {
            setMealTitle("Breakfast")
            setMealItems([])
            setMealPhotoFile([])
            setMealPhotoPreview("")
            setCurrentBg(0)
            setNotes("")
            setDoseConfirmed(false)
          }
        })
      }
    })
  }

  // user-preferences related-functions
  const { data: user, isLoading: userLoading, isError: userIsError, error: userError } = useGetUserById()
  const { mutate: mutateUpdateUser, isPending: updateUserPending } = useUpdateUser()
  const [updatedUserInfo, setUpdatedUserInfo] = useState(user)
  const [isEditingUserInfo, setIsEditingUserInfo] = useState(false)
  useEffect(() => {
    if (user) setUpdatedUserInfo(user);
  }, [user]);

  const [newFoodName, setNewFoodName] = useState("");
  const [newFoodCarbs, setNewFoodCarbs] = useState("");
  const [newFoodGrams, setNewFoodGrams] = useState("");
  const { data: foods, isLoading: foodsLoading, isError: foodsIsError, error: foodsError} = useGetUserFoods()
  const { mutate: mutateDeleteUserFood, isPending: deleteFoodPending } = useDeleteUserFood()
  const { mutate: mutateCreateUserFood, isPending: createFoodPending } = useCreateUserFood()
  const handleAddNewFood = () => {
    if (!newFoodName || !newFoodCarbs || !newFoodGrams) return;
    mutateCreateUserFood({
      name: newFoodName,
      grams: Number(newFoodGrams),
      carbs: Number(newFoodCarbs),
      createdAt: new Date().toISOString()
    })
    setNewFoodName("");
    setNewFoodCarbs("");
    setNewFoodGrams("");
  };

  // meal log related-functions
  const [searchTerm, setSearchTerm] = useState("");
  const addFoodToMeal = (food: Food) => {
    if (mealItems.some(item => item.id === food.id)){
      setSearchTerm("")
      return
    };
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
  const filteredFood = useMemo(() => {
    if (!searchTerm) return [];
    return foods?.filter((food : Food) =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMealPhotoPreview(URL.createObjectURL(e.target.files[0]));
      setMealPhotoFile([e.target.files[0]])
    }
  };

  // dose calculations
  const totalCarbs = useMemo(
    () => mealItems.reduce((sum, item) => sum + item.carbs * item.servings, 0),   // Derived State & Calculations
    [mealItems]
  );
  const doseCalculation = useMemo(() => {
    if (!totalCarbs && !currentBg)
      return { carbDose: 0, correctionDose: 0, totalDose: 0 };
    const carbDose = totalCarbs > 0 && user.icRatio > 0 ? totalCarbs / user.icRatio : 0;
    const correctionDose =
      currentBg > user.targetBG ? (currentBg - user.targetBG) / user.correctionFactor : 0;
    const totalDose = carbDose + correctionDose;
    return {
      carbDose: parseFloat(carbDose.toFixed(1)),
      correctionDose: parseFloat(correctionDose.toFixed(1)),
      totalDose: parseFloat(totalDose.toFixed(1)),
    };
  }, [totalCarbs, currentBg, user]);

  // Confirm/undo take dose insulin based on calculation
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const handleConfirmDose = () => {
    const now = new Date();
    setDoseConfirmed(true);
    setDoseTimestamp(now)
    setElapsedTime(0);
    timerRef.current = setInterval(() => {
      setElapsedTime(Date.now() - now.getTime());
    }, 1000);
  };
  const handleUndoDose = () => {
    setDoseConfirmed(false);
    setElapsedTime(0);
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
    }
  };

  // make reminder post confirmation
  const [reminderSet, setReminderSet] = useState<number>(0);
  const handleSetReminder = (hours: number) => {
    setReminderSet(hours);
    setTimeout(() => {
      console.log(`REMINDER: Time to check your blood glucose! It has been ${hours} hour(s).`);
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
  
  if(foodsLoading || userLoading || !user) return <Loading message="Loading User's Meal Planner..."/>
  if(foodsIsError) return <ErrorBox error={foodsError}/>
  if(userIsError) return <ErrorBox error={userError}/>

  const countdownProgress = Math.min(
    (elapsedTime / (user.eatCountdown * 60 * 1000)) * 100,
    100
  );
  const timeToEat = user && user.eatCountdown !== undefined
    ? user.eatCountdown * 60 - Math.floor(elapsedTime / 1000)
    : null;

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
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                  placeholder="Enter current BG..."
                  value={currentBg !== 0 ? String(currentBg) : ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*$/.test(val)) {
                      setCurrentBg(val === "" ? 0 : Number(val));
                    }
                  }}
                  className="border-black h-12 text-lg font-bold flex-1"
                  disabled={doseConfirmed}
                />

                <div
                  className={`w-auto text-center font-bold p-3 rounded-lg border-2 border-black ${
                    currentBg === 0
                      ? "bg-gray-200"
                      : currentBg > 180
                      ? "bg-orange-200"
                      : currentBg < 70
                      ? "bg-red-200"
                      : "bg-green-200"
                  }`}
                >
                  {currentBg === 0
                    ? "?"
                    : currentBg > 180
                    ? "High"
                    : currentBg < 70
                    ? "Low"
                    : "Normal"}{" "}
                  ({currentBg} mg/dL)
                </div>
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
                  <div className="flex flex-col ">
                    <div className="flex items-center gap-2 text-sm text-gray-600 font-semibold mb-2">
                      <ArrowRight size={16} /> insert new food choice if needed
                    </div>
                    <div className="flex flex-row w-full items-center space-x-2 mb-4">
                      <Input
                        placeholder="Name"
                        value={newFoodName}
                        onChange={(e) => setNewFoodName(e.target.value)}
                        className="border-black h-12"
                        disabled={doseConfirmed}
                      />
                      <Input
                        placeholder="Carbs (g)"
                        type="number"
                        value={newFoodCarbs}
                        onChange={(e) => setNewFoodCarbs(e.target.value)}
                        className="border-black h-12 w-48"
                        disabled={doseConfirmed}
                      />
                      <Input
                        placeholder="Grams (g)"
                        type="number"
                        value={newFoodGrams}
                        onChange={(e) => setNewFoodGrams(e.target.value)}
                        className="border-black h-12 w-48"
                        disabled={doseConfirmed}
                      />
                      <Button
                        variant="default"
                        size="icon"
                        className="h-12 w-12"
                        onClick={() => handleAddNewFood()}
                        disabled={createFoodPending}
                      >
                        <Plus size={20} />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 font-semibold mb-2">
                      <ArrowRight size={16} /> log you current meals here
                    </div>
                    <div className="relative">
                      <Input
                        placeholder="Search for food..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border-black h-12 pl-10"
                        disabled={doseConfirmed}
                      />
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  {filteredFood && filteredFood.length > 0 && (
                    <div className="absolute z-10 w-full bg-white border-2 border-black rounded-lg mt-1 shadow-lg max-h-48 overflow-y-auto">
                      {filteredFood.map((food : Food) => (
                        <div
                          key={food.id}
                          onClick={() => addFoodToMeal(food)}
                          className="flex flex-row items-center p-3 hover:bg-gray-100 cursor-pointer border-b"
                        >
                          {food.name}{" "}
                          <span className="ml-2 text-gray-500 text-sm">({food.carbs}g carbs)</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 ml-auto"
                            onClick={(e) => {
                              e.stopPropagation()
                              mutateDeleteUserFood(food.id)
                              setSearchTerm("")
                            }}
                            disabled={deleteFoodPending}
                          >
                            <Trash2 size={16} />
                          </Button>
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
                        <span className="flex-grow font-semibold">{item.name}</span>
                        <span className="text-gray-500 text-sm">({item.carbs}g carbs)</span>
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
                  {mealPhotoPreview ? (
                    <div className="relative">
                      <img
                        src={mealPhotoPreview}
                        alt="Meal"
                        className="w-full h-32 object-cover rounded-lg border-2 border-black"
                      />
                      <Button
                        onClick={() => setMealPhotoPreview("")}
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 bg-black/50 hover:bg-black/70 text-white rounded-full"
                        disabled={doseConfirmed}
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
              <CardContent className="space-y-2">
                <div className="flex justify-between items-center px-3 py-2 bg-blue-50 rounded-lg border">
                  {isEditingUserInfo ? (
                    <div className="flex flex-col items-center gap-1 w-full">
                      <div className="flex flex-row items-center gap-2 w-full">
                        <Label className="font-semibold text-md">Target BG<span className="text-gray-500 text-xs font-normal">(80 - 110)</span></Label>
                        <Input
                          type="text"
                          inputMode="numeric"
                          pattern="\d*"
                          placeholder={String(user.targetBG)}
                          value={updatedUserInfo.targetBG !== undefined ? String(updatedUserInfo.targetBG) : ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (/^\d*$/.test(val)) {
                              setUpdatedUserInfo({
                                ...updatedUserInfo,
                                targetBG: val === "" ? undefined : Number(val),
                              });
                            }
                          }}
                          className="w-20 h-7 ml-auto border-black"
                        />
                      </div>

                      <div className="flex flex-row items-center gap-2 w-full">
                        <Label className="font-semibold text-md">IC Ratio<span className="text-gray-500 text-xs font-normal">(10 - 15)</span></Label>
                        <Input
                          type="text"
                          inputMode="numeric"
                          pattern="\d*"
                          placeholder={String(user.icRatio)}
                          value={updatedUserInfo.icRatio !== undefined ? String(updatedUserInfo.icRatio) : ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (/^\d*$/.test(val)) {
                              setUpdatedUserInfo({
                                ...updatedUserInfo,
                                icRatio: val === "" ? undefined : Number(val),
                              });
                            }
                          }}
                          className="w-20 h-7 ml-auto border-black"
                        />
                      </div>

                      <div className="flex flex-row items-center gap-2 w-full">
                        <Label className="font-semibold text-md">Correction<span className="text-gray-500 text-xs font-normal">(30-100)</span></Label>
                        <Input
                          type="text"
                          inputMode="numeric"
                          pattern="\d*"
                          placeholder={String(user.correctionFactor)}
                          value={updatedUserInfo.correctionFactor !== undefined ? String(updatedUserInfo.correctionFactor) : ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (/^\d*$/.test(val)) {
                              setUpdatedUserInfo({
                                ...updatedUserInfo,
                                correctionFactor: val === "" ? undefined : Number(val),
                              });
                            }
                          }}
                          className="w-20 h-7 ml-auto border-black"
                        />
                      </div>

                      <div className="flex flex-row items-center gap-2 w-full">
                        <Label className="font-semibold text-md">Eat Countdown<span className="text-gray-500 text-xs font-normal">(15 - 60)</span></Label>
                        <Input
                          type="text"
                          inputMode="numeric"
                          pattern="\d*"
                          placeholder={String(user.eatCountdown)}
                          value={updatedUserInfo.eatCountdown !== undefined ? String(updatedUserInfo.eatCountdown) : ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (/^\d*$/.test(val)) {
                              setUpdatedUserInfo({
                                ...updatedUserInfo,
                                eatCountdown: val === "" ? undefined : Number(val),
                              });
                            }
                          }}
                          className="w-20 h-7 ml-auto border-black"
                        />
                      </div>
                      <div className="flex flex-row w-full gap-2">
                        <Button
                          size="icon"
                          className="h-8 bg-green-500 flex-1"
                          onClick={() => {
                            mutateUpdateUser(updatedUserInfo)
                            setIsEditingUserInfo(false);
                          }}
                          disabled={updateUserPending}
                        >
                          Save <Save size={16} />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 flex-1"
                          onClick={() => {
                            setIsEditingUserInfo(false)
                            setUpdatedUserInfo(user)
                          }}
                          disabled={updateUserPending}
                        >
                          Cancel <X size={16} />
                        </Button>
                      </div>
                      <span className="text-gray-500 text-sm font-normal mb-1">(...) = recommended ranges by medical info</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 w-full">
                      <div className="flex flex-row w-full">
                        <span className="font-semibold">Target BG : </span>
                        <span className="ml-auto">{user.targetBG} mg/dL</span>
                      </div>
                      <div className="flex flex-row w-full">
                        <span className="font-semibold">IC Ratio : </span>
                        <span className="ml-auto">1 unit / {user.icRatio}g</span>
                      </div>
                      <div className="flex flex-row w-full">
                        <span className="font-semibold">Correction : </span>
                        <span className="ml-auto flex flex-row items-center">1 unit <ArrowDown className="w-5 h-5"/> {user.correctionFactor} mg/dL</span>
                      </div>
                      <div className="flex flex-row w-full">
                        <span className="font-semibold">Eat Countdown : </span>
                        <span className="ml-auto">{user.eatCountdown} minutes</span>
                      </div>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-full"
                        onClick={() => {
                          setIsEditingUserInfo(true);
                        }}
                        disabled={updateUserPending}
                      >
                        Edit User Preference <Edit size={16} />
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
                  disabled={doseCalculation.totalDose <= 0 || doseConfirmed || createMealWithFoodsPending || uploadImagesPending || isEditingUserInfo}
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
                      {timeToEat && timeToEat > 0
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
                <CardFooter className="flex flex-col gap-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleUndoDose}
                  >
                    <Undo2 className="mr-2" />
                    Undo Confirmation
                  </Button>
                  <Button
                    variant="default"
                    className={(timeToEat === null || timeToEat > 0) ? "w-full bg-red-500 hover:bg-red-700" : "w-full bg-green-500 hover:bg-green-700"}
                    onClick={() => handleMealSubmit()}
                    disabled={timeToEat === null || timeToEat > 0}
                  >
                    <Check className="mr-2"/>
                    Finish Eating
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
