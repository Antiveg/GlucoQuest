import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ShieldCheck,
  TrendingUp,
  Award,
  Swords,
  Heart,
  Sparkles,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div>
      <main>
        <section className="bg-[#D9EFF7] py-20 px-4 border-b-2 border-black">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
            <div className="text-center md:text-left">
              <h1 className="text-5xl md:text-6xl font-black leading-tight">
                Turn Diabetes Management into an Adventure.
              </h1>
              <p className="mt-4 text-lg text-gray-800">
                Stop dreading the daily grind. GlucoQuest makes tracking your
                glucose, meals, and insulin feel less like a chore and more like
                a game. Level up your health!
              </p>
              <div className="mt-8 flex justify-center md:justify-start gap-4">
                <a href="/signup">
                  <Button
                    size="lg"
                    className="h-14 px-8 bg-[#4741A6] text-white font-bold text-lg border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-[#3b368a] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
                  >
                    Start Your Quest
                  </Button>
                </a>
              </div>
            </div>
            <HeroIllustration />
          </div>
        </section>

        <section id="features" className="py-24 px-4">
          <div className="container mx-auto">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-4xl font-bold">
                Everything You Need to Conquer Your Day
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                GlucoQuest is packed with powerful tools presented in a fun,
                engaging way.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={TrendingUp}
                title="Effortless Logging"
                description="Quickly log glucose, carbs, and insulin. Our smart system makes it faster than ever."
              />
              <FeatureCard
                icon={Award}
                title="Gamified Challenges"
                description="Complete daily and weekly quests, earn badges, and level up as you build healthy habits."
              />
              <FeatureCard
                icon={Sparkles}
                title="Smart Insights"
                description="See clear trends and get helpful tips. Understand your body's patterns like never before."
              />
              <FeatureCard
                icon={ShieldCheck}
                title="Dose Calculator"
                description="Our reliable insulin calculator helps you figure out carb and correction doses with confidence."
              />
              <FeatureCard
                icon={Heart}
                title="Health Heroes"
                description="Connect with friends, share progress, and support each other on your health journeys."
              />
              <FeatureCard
                icon={Swords}
                title="Adventure Awaits"
                description="A beautiful, fun interface that makes you actually want to open the app."
              />
            </div>
          </div>
        </section>

        <section
          id="testimonials"
          className="bg-[#F0F8FF] py-24 px-4 border-y-2 border-black"
        >
          <div className="container mx-auto">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-4xl font-bold">
                Join Thousands of Happy Adventurers
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Don&apos;t just take our word for it. Here&apos;s what our users
                are saying.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TestimonialCard
                user="Sarah K."
                quote="I used to hate logging my numbers. GlucoQuest actually makes it fun! The little rewards are so motivating."
              />
              <TestimonialCard
                user="Mike T."
                quote="The dose calculator is a lifesaver. It’s taken so much guesswork out of my daily routine. My A1c has never been better."
              />
              <TestimonialCard
                user="Jenna P."
                quote="Finally, a diabetes app that doesn't look like medical software from the 90s. The design is amazing and keeps me engaged."
              />
            </div>
          </div>
        </section>

        <section id="pricing" className="py-24 px-4">
          <div className="container mx-auto text-center">
            <div className="max-w-2xl mx-auto">
              <Swords className="mx-auto h-16 w-16 text-[#4741A6] mb-4" />
              <h2 className="text-4xl font-black">
                Ready to Start Your Quest?
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Gain control, have fun, and connect with a community that gets
                it. Your adventure starts now, and it&apos;s completely free to
                get started.
              </p>
              <div className="mt-8">
                <a href="/signup">
                  <Button
                    size="lg"
                    className="h-14 px-8 bg-[#F9CE69] text-black font-bold text-lg border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-yellow-400 active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
                  >
                    Claim Your Free Account
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

interface FeatureCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <div className="bg-white p-6 rounded-2xl border-2 border-black shadow-[8px_8px_0px_#000] text-center">
    <div className="inline-block p-4 bg-[#D9EFF7] rounded-full border-2 border-black mb-4">
      <Icon className="h-8 w-8 text-[#4741A6]" />
    </div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="mt-2 text-gray-600">{description}</p>
  </div>
);

interface TestimonialCardProps {
  user: string;
  quote: string;
}

const TestimonialCard = ({ user, quote }: TestimonialCardProps) => (
  <Card className="bg-white rounded-2xl border-2 border-black shadow-[8px_8px_0px_#9BBBFC] p-6">
    <CardContent className="p-0">
      <p className="text-gray-800 italic">&quot;{quote}&quot;</p>
      <p className="mt-4 font-bold text-right text-[#4741A6]">- {user}</p>
    </CardContent>
  </Card>
);

const HeroIllustration = () => (
  <div className="relative w-full h-80 md:h-96">
    <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full border-2 border-black flex items-center justify-center -rotate-12 shadow-lg">
      <TrendingUp className="h-16 w-16 text-green-500" />
    </div>
    <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-2xl border-2 border-black flex items-center justify-center rotate-12 shadow-[8px_8px_0px_#000]">
      <Award className="h-24 w-24 text-yellow-500" />
    </div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#9BBBFC] rounded-full border-2 border-black flex items-center justify-center shadow-2xl">
      <Heart className="h-28 w-28 text-red-500 fill-current" />
    </div>
  </div>
);
