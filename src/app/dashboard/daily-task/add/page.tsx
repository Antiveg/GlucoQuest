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
  PlusCircle,
  ClipboardEdit,
  Clock,
  NotebookText,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { CreateTask } from "@/types/task";

export default function AddNewQuestPage() {
  const [form, setForm] = useState<CreateTask>({
    task: "",
    deadline: "19:00",
    details: "",
    done: false,
  });

  const handleChange =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm({ ...form, [field]: e.target.value });
    };

  const handleSubmit = () => {
    console.log("Submitting Task:", form);
  };

  return (
    <div className="min-h-screen w-full bg-[#F0F8FF] font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <Link
              href="/dashboard/daily-task"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-black font-semibold mb-2"
            >
              <ArrowLeft size={16} /> Back to Quest Log
            </Link>
            <h1 className="text-3xl font-bold text-black flex items-center gap-2">
              <PlusCircle /> Create a New Quest
            </h1>
          </div>
        </header>

        <Card className="bg-white rounded-2xl border-2 border-black shadow-[8px_8px_0px_#000]">
          <CardHeader>
            <CardTitle>Quest Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="quest-name"
                className="flex items-center gap-2 font-semibold"
              >
                <ClipboardEdit size={16} /> Quest Name
              </Label>
              <Input
                id="quest-name"
                placeholder="e.g., Evening walk"
                className="border-black h-12"
                value={form.task}
                onChange={handleChange("task")}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="deadline"
                className="flex items-center gap-2 font-semibold"
              >
                <Clock size={16} /> Deadline
              </Label>
              <Input
                id="deadline"
                type="time"
                className="border-black h-12"
                value={form.deadline}
                onChange={handleChange("deadline")}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="details"
                className="flex items-center gap-2 font-semibold"
              >
                <NotebookText size={16} /> Details (Optional)
              </Label>
              <Textarea
                id="details"
                placeholder="Add any instructions or notes here..."
                className="border-black min-h-[120px]"
                value={form.details}
                onChange={handleChange("details")}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-end gap-3 p-6 border-t-2 border-black">
            <Button
              className="cursor-pointer w-full sm:w-auto bg-[#4741A6] text-white font-bold text-lg h-12 rounded-lg border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-[#3b368a] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
              onClick={handleSubmit}
            >
              Add Quest to Log
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
