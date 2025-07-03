"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Swords, Award, CheckCircle2 } from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen w-full bg-white font-sans text-black">
      <main>
        <section className="bg-[#D9EFF7] py-20 px-4 border-b-2 border-black">
          <div className="container mx-auto text-center">
            <Award className="mx-auto h-20 w-20 text-[#4741A6] mb-4" />
            <h1 className="text-5xl md:text-6xl font-black leading-tight">
              Your Epic Toolkit
            </h1>
            <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-800">
              Explore the powerful, fun, and easy-to-use features that make
              GlucoQuest the ultimate ally in your health adventure.
            </p>
          </div>
        </section>

        {/* Feature Detail Sections */}
        <FeatureDetailSection
          title="Gamified Logging & Daily Quests"
          description="Say goodbye to boring logs. With GlucoQuest, tracking your glucose, meals, and insulin is part of a daily quest. Complete tasks, earn experience points, and unlock awesome badges. We make consistency feel rewarding."
          imageUrl="https://placehold.co/600x400/9BBBFC/000000?text=Quest+Log"
          imagePosition="right"
          points={[
            "Quick-add buttons for glucose, insulin, and meals.",
            "Daily checklists that build healthy routines.",
            "Earn unique badges for milestones and streaks.",
          ]}
        />

        <FeatureDetailSection
          title="Smart Insights & Trend Reports"
          description="Knowledge is power. Our dashboard transforms your data into beautiful, easy-to-read charts. See your Time in Range, spot trends, and understand how your choices affect your glucose levels over time."
          imageUrl="https://placehold.co/600x400/D9EFF7/000000?text=Glucose+Graph"
          imagePosition="left"
          points={[
            "Visual line graphs for daily, weekly, and monthly trends.",
            "Clear stats for average glucose, high/low values, and more.",
            "Identify patterns to have better conversations with your doctor.",
          ]}
        />

        <FeatureDetailSection
          title="Intelligent Dose Calculator"
          description="Take the guesswork out of mealtime insulin. Our Meal Planner features a powerful calculator that suggests doses based on your carb intake, current blood sugar, and personal insulin-to-carb ratio. It's safety and simplicity, combined."
          imageUrl="https://placehold.co/600x400/F9CE69/000000?text=Dose+Calculator"
          imagePosition="right"
          points={[
            "Calculates both carb coverage and correction doses.",
            "Customizable settings for your unique needs.",
            "Post-dose timers to help you time your meals perfectly.",
          ]}
        />

        <FeatureDetailSection
          title="Seamless Device Integration"
          description="Connect your Continuous Glucose Monitor (CGM) directly to GlucoQuest. Your readings will sync automatically, saving you time and ensuring your data is always up-to-date without manual entry."
          imageUrl="https://placehold.co/600x400/9BBBFC/000000?text=CGM+Sync"
          imagePosition="left"
          points={[
            "Supports popular CGM devices.",
            "Automatic, background data synchronization.",
            "Clear status indicators to show you're connected.",
          ]}
        />

        <section className="bg-[#F0F8FF] py-24 px-4 border-t-2 border-black">
          <div className="container mx-auto text-center">
            <div className="max-w-2xl mx-auto">
              <Swords className="mx-auto h-16 w-16 text-[#4741A6] mb-4" />
              <h2 className="text-4xl font-black">
                Ready to Wield These Tools?
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                All these features and more are waiting for you. Start your free
                adventure today and take the first step towards a more
                empowered, fun-filled health journey.
              </p>
              <div className="mt-8">
                <a href="/signup">
                  <Button
                    size="lg"
                    className="h-14 px-8 bg-[#F9CE69] text-black font-bold text-lg border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-yellow-400 active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
                  >
                    Begin Your Free Quest
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

interface FeatureDetailSectionProps {
  title: string;
  description: string;
  imageUrl: string;
  imagePosition: string;
  points: string[];
}

const FeatureDetailSection = ({
  title,
  description,
  imageUrl,
  imagePosition,
  points,
}: FeatureDetailSectionProps) => {
  const isImageRight = imagePosition === "right";
  return (
    <section className="py-24 px-4">
      <div
        className={`container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12`}
      >
        <div
          className={`text-left ${isImageRight ? "md:order-1" : "md:order-2"}`}
        >
          <h2 className="text-4xl font-bold">{title}</h2>
          <p className="mt-4 text-lg text-gray-700">{description}</p>
          <ul className="mt-6 space-y-3">
            {points.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <span className="text-gray-800">{point}</span>
              </li>
            ))}
          </ul>
        </div>
        <div
          className={`w-full h-80 bg-white rounded-2xl border-2 border-black shadow-[8px_8px_0px_#000] flex items-center justify-center p-8 ${
            isImageRight ? "md:order-2" : "md:order-1"
          }`}
        >
          <img
            src={imageUrl}
            alt={`${title} illustration`}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </section>
  );
};
