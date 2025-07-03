"use client";

import React from "react";
import { Card, CardTitle } from "@/components/ui/card";
import {
  Heart,
  Users,
  Sparkles,
  Map,
  Target,
  Linkedin,
  Twitter,
} from "lucide-react";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Stanic Dylan",
      role: "Web Developer",
      avatar: "🧙‍♂️",
      bio: "Dylan belives that the power of technology is here to help everyone.",
    },
    {
      name: "Nathaniel Alexander",
      role: "Web Developer",
      avatar: "🎨",
      bio: "Nathan wishes that diabetes care is less intimidating and instead be something empowering.",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-white font-sans text-black">
      <main>
        <section className="bg-[#D9EFF7] py-20 px-4 border-b-2 border-black">
          <div className="container mx-auto text-center">
            <Map className="mx-auto h-20 w-20 text-[#4741A6] mb-4" />
            <h1 className="text-5xl md:text-6xl font-black leading-tight">
              Our Epic Quest
            </h1>
            <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-800">
              We&apos;re a small band of developers, designers, and diabetes
              advocates on a mission to change the way the world sees health
              management.
            </p>
          </div>
        </section>

        <section id="mission" className="py-24 px-4">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
            <div className="text-center md:text-left">
              <Target className="h-16 w-16 text-red-500 mb-4 inline-block" />
              <h2 className="text-4xl font-bold">
                Our Mission: Fun First, Health Always
              </h2>
              <p className="mt-4 text-lg text-gray-700">
                Living with diabetes is a journey that requires daily courage
                and consistency. We believe the tools for this journey
                shouldn&apos;t be cold, clinical, or complicated. Our mission is
                to build an app that’s not just useful, but genuinely fun to
                use. By blending proven health strategies with engaging game
                design, we empower our users to take control of their health
                with a smile.
              </p>
            </div>
            <div className="w-full h-80 bg-white rounded-2xl border-2 border-black shadow-[8px_8px_0px_#000] flex items-center justify-center p-8">
              <img
                src="https://images.unsplash.com/vector-1739811941027-c735b9459deb?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="fun cartoon"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </section>

        <section
          id="team"
          className="bg-[#F0F8FF] py-24 px-4 border-y-2 border-black"
        >
          <div className="container mx-auto">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-4xl font-bold">Meet the Adventuring Party</h2>
              <p className="mt-4 text-lg text-gray-600">
                We&apos;re a passionate crew dedicated to forging the best
                health tools.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
              {teamMembers.map((member) => (
                <Card
                  key={member.name}
                  className="bg-white rounded-2xl border-2 border-black shadow-[8px_8px_0px_#9BBBFC] text-center p-6"
                >
                  <div className="w-24 h-24 rounded-full bg-[#D9EFF7] border-2 border-black flex items-center justify-center text-5xl mx-auto mb-4">
                    {member.avatar}
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <p className="font-semibold text-[#4741A6]">{member.role}</p>
                  <p className="text-sm text-gray-600 mt-2">{member.bio}</p>
                  <div className="flex justify-center gap-3 mt-4">
                    <a href="#" className="text-gray-500 hover:text-black">
                      <Twitter />
                    </a>
                    <a href="#" className="text-gray-500 hover:text-black">
                      <Linkedin />
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="values" className="py-24 px-4">
          <div className="container mx-auto">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-4xl font-bold">Our Guiding Stars</h2>
              <p className="mt-4 text-lg text-gray-600">
                These are the principles that light our path.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <ValueCard
                icon={Sparkles}
                title="Joyful by Design"
                description="We believe in the power of fun. Every feature is designed to be engaging and motivating."
              />
              <ValueCard
                icon={Users}
                title="Community Powered"
                description="Our strength comes from our users. We build with you, for you."
              />
              <ValueCard
                icon={Heart}
                title="Empathy First"
                description="We understand the journey because we're on it too. We lead with compassion in everything we do."
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

interface ValueCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

const ValueCard = ({ icon: Icon, title, description }: ValueCardProps) => (
  <div className="bg-white p-6 rounded-2xl border-2 border-black text-center">
    <div className="inline-block p-4 bg-[#F9CE69] rounded-full border-2 border-black mb-4">
      <Icon className="h-8 w-8 text-black" />
    </div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="mt-2 text-gray-600">{description}</p>
  </div>
);
