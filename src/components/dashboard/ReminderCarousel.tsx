"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const reminders = [
  {
    title: "Don't forget to bring a juice box!",
    subtitle: "Great for treating low blood sugar on the go.",
  },
  {
    title: "Check your glucose before exercise.",
    subtitle: "Helps avoid unexpected lows during activity.",
  },
  {
    title: "Carry extra insulin supplies.",
    subtitle: "Better to have them and not need them!",
  },
  {
    title: "Rotate your injection sites.",
    subtitle: "Helps prevent skin irritation and lumps.",
  },
];

export function ReminderCarousel() {
  const autoplay = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  ).current;

  return (
    <Carousel
      plugins={[autoplay]}
      opts={{ loop: true, align: "start" }}
      className="relative"
    >
      <CarouselContent>
        {reminders.map((reminder, idx) => (
          <CarouselItem key={idx} className="p-4">
            <Card className="relative bg-[#D9EFF7] rounded-2xl border-2 border-black shadow-[8px_8px_0px_#000]">
              <CarouselPrevious className="cursor-pointer absolute left-2 top-1/2 z-10 -translate-y-1/2 bg-white rounded-full border border-black shadow" />
              <CarouselNext className="cursor-pointer absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-white rounded-full border border-black shadow" />
              <CardHeader className="text-center">
                <CardTitle className="text-base">Daily Reminder</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-center">
                  {reminder.title}
                </p>
                <p className="text-xs text-gray-500 text-center">
                  {reminder.subtitle}
                </p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
