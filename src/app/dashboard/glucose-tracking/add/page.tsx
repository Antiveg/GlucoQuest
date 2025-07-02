"use client";

import React, { useState } from "react";
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
  Calendar,
  Clock,
  Tag,
  NotebookText,
  ChevronLeft,
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { GlucoseReadingInput } from "@/types";
import { useCreateGlucoseReading } from "@/lib/client-queries/glucose-readings";

// --- MOCK DATA & CONFIG ---
const READING_TAGS = [
  "Fasting",
  "Before Meal",
  "After Meal",
  "Bedtime",
  "Snack",
  "Exercise",
];

export default function AddGlucoseReadingForm() {
  const [selectedTag, setSelectedTag] = useState("After Meal");
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [time, setTime] = useState(format(new Date(), "HH:mm"));
  const [glucose, setGlucose] = useState("");
  const [notes, setNotes] = useState("");
  const { mutate, isPending } = useCreateGlucoseReading()

  async function handleSubmit() {
    if (!glucose || Number(glucose) <= 0) {
      alert("Please enter a valid glucose value.");
      return;
    }

    const localDate = new Date(`${date}T${time}:00`);

    const reading: GlucoseReadingInput = {
      time: localDate.toISOString(),
      glucose: Number(glucose),
      tag: selectedTag,
      notes: notes || "",
    };

    mutate(reading)
  }

  return (
    <div className="min-h-screen w-full bg-[#F0F8FF] font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Card className="w-full bg-white rounded-2xl border-2 border-black shadow-[8px_8px_0px_#4741A6] animate-in fade-in-0 zoom-in-95">
          <CardHeader className="py-4 flex flex-row items-center justify-between border-b-2 border-black">
            <Link
              href="/dashboard/glucose-tracking"
              className="p-2 border-2 border-black rounded-full hover:bg-gray-100 transition duration-200 cursor-pointer inline-flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <CardTitle className="text-2xl font-bold text-center flex-1">
              Log a New Reading
            </CardTitle>

            {/* <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full"
            >
              <X className="h-6 w-6" />
            </Button> */}
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="date"
                  className="flex items-center gap-2 font-semibold"
                >
                  <Calendar className="h-4 w-4" /> Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value)
                  }}
                  className="border-black h-12"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="time"
                  className="flex items-center gap-2 font-semibold"
                >
                  <Clock className="h-4 w-4" /> Time
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="border-black h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="glucose"
                className="flex items-center gap-2 font-semibold"
              >
                <Droplet className="h-4 w-4" /> Glucose (mg/dL)
              </Label>
              <div className="relative">
                <Input
                  id="glucose"
                  type="number"
                  placeholder="e.g., 120"
                  className="border-black h-16 text-2xl font-bold pl-12"
                  value={glucose}
                  onChange={(e) => setGlucose(e.target.value)}
                />
                <Droplet className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="flex items-center gap-2 font-semibold">
                <Tag className="h-4 w-4" /> Tag
              </Label>
              <div className="flex flex-wrap gap-2">
                {READING_TAGS.map((tag) => (
                  <Button
                    key={tag}
                    variant="outline"
                    onClick={() => setSelectedTag(tag)}
                    className={`rounded-full border-2 border-black font-bold transition-all ${
                      selectedTag === tag
                        ? "bg-[#F9CE69] text-black shadow-[2px_2px_0px_#000]"
                        : "bg-white hover:bg-gray-100"
                    }`}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="notes"
                className="flex items-center gap-2 font-semibold"
              >
                <NotebookText className="h-4 w-4" /> Notes (Optional)
              </Label>
              <Textarea
                id="notes"
                placeholder="e.g., Felt tired, ate an apple..."
                className="border-black min-h-[100px]"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-end gap-3 p-6 border-t-2 border-black">
            <Button
              onClick={handleSubmit}
              disabled={isPending}
              className="cursor-pointer w-full sm:w-auto bg-[#4741A6] text-white font-bold text-lg h-12 rounded-lg border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-[#3b368a] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
            >
              {isPending ? "Saving..." : "Save Reading"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
