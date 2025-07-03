"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  ShieldQuestion,
  Apple,
  Footprints,
  Syringe,
  Droplets,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function AwarenessPage() {
  return (
    <div className="min-h-screen w-full bg-white font-sans text-black">
      <main>
        <section className="bg-[#D9EFF7] py-20 px-4 border-b-2 border-black">
          <div className="container mx-auto text-center">
            <BookOpen className="mx-auto h-20 w-20 text-[#4741A6] mb-4" />
            <h1 className="text-5xl md:text-6xl font-black leading-tight">
              Knowledge is Your Superpower
            </h1>
            <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-800">
              Understanding diabetes is the first step on your quest to
              mastering it. Let&apos;s learn the basics together!
            </p>
          </div>
        </section>

        <section id="what-is-diabetes" className="py-24 px-4">
          <div className="container mx-auto">
            <div className="text-center max-w-2xl mx-auto">
              <ShieldQuestion className="h-16 w-16 text-blue-500 mb-4 inline-block" />
              <h2 className="text-4xl font-bold">What is Diabetes?</h2>
              <p className="mt-4 text-lg text-gray-700">
                Think of insulin as a key that unlocks your body&apos;s cells to
                let in glucose (sugar) for energy. Diabetes is a condition where
                this key doesn&apos;t work properly.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-white rounded-2xl border-2 border-black shadow-[8px_8px_0px_#000]">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    Type 1: The Missing Key
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    In Type 1, the body&apos;s immune system, its &quot;Royal
                    Guard,&quot; mistakenly attacks and destroys the cells that
                    make insulin. This means the body has very few or no keys at
                    all. People with Type 1 need to take insulin to live.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white rounded-2xl border-2 border-black shadow-[8px_8px_0px_#000]">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    Type 2: The Rusty Lock
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    In Type 2, the body either doesn&apos;t make enough insulin
                    (not enough keys) or the body&apos;s cells don&apos;t
                    respond to it properly (the locks are &quot;rusty&quot;).
                    This is called insulin resistance. It can often be managed
                    with lifestyle changes, pills, and sometimes insulin.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section
          id="pillars"
          className="bg-[#F0F8FF] py-24 px-4 border-y-2 border-black"
        >
          <div className="container mx-auto">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-4xl font-bold">
                The Four Pillars of Your Quest
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Mastering these four areas is key to a successful health
                adventure.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <PillarCard
                icon={Droplets}
                title="Monitoring"
                description="Regularly checking your blood sugar to know your levels and make smart decisions."
              />
              <PillarCard
                icon={Apple}
                title="Healthy Eating"
                description="Fueling your body with balanced meals to keep your energy stable and predictable."
              />
              <PillarCard
                icon={Footprints}
                title="Being Active"
                description="Exercise helps your body use insulin more effectively and has tons of other benefits."
              />
              <PillarCard
                icon={Syringe}
                title="Medication"
                description="Taking insulin or other medications as prescribed to keep your body in balance."
              />
            </div>
          </div>
        </section>

        <section id="myths" className="py-24 px-4">
          <div className="container mx-auto">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-4xl font-bold">
                Quest Debunked: Fact vs. Fiction
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Let&apos;s clear up some common myths about diabetes.
              </p>
            </div>
            <div className="mt-16 space-y-6 max-w-3xl mx-auto">
              <MythCard
                myth="Eating too much sugar causes diabetes."
                fact="While a diet high in sugar can contribute to developing Type 2, it's not the sole cause. Type 1 is an autoimmune disease, and Type 2 is complex, involving genetics and lifestyle."
              />
              <MythCard
                myth="People with diabetes can't eat sweets."
                fact="It's all about balance and portion control. Sweets can be part of a healthy meal plan when accounted for properly."
              />
              <MythCard
                myth="Diabetes is not that serious."
                fact="If not managed properly, diabetes can lead to serious health complications. Consistent management is the key to a long, healthy life."
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

interface PillarCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

const PillarCard = ({ icon: Icon, title, description }: PillarCardProps) => (
  <div className="bg-white p-6 rounded-2xl border-2 border-black text-center shadow-[8px_8px_0px_#9BBBFC]">
    <div className="inline-block p-4 bg-[#D9EFF7] rounded-full border-2 border-black mb-4">
      <Icon className="h-10 w-10 text-[#4741A6]" />
    </div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="mt-2 text-gray-600">{description}</p>
  </div>
);

interface MythCardProps {
  myth: string;
  fact: string;
}

const MythCard = ({ myth, fact }: MythCardProps) => (
  <Card className="bg-white rounded-2xl border-2 border-black overflow-hidden">
    <CardHeader className="bg-red-100 p-4">
      <CardTitle className="flex items-center gap-2 text-red-700">
        <XCircle /> Myth:{" "}
        <span className="font-normal italic">&quot;{myth}&quot;</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="p-4 bg-green-50">
      <p className="flex items-start gap-2 font-semibold text-green-800">
        <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" /> Fact:{" "}
        <span className="font-normal">{fact}</span>
      </p>
    </CardContent>
  </Card>
);
