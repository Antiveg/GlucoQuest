"use client";

import OtherSignIn from "@/components/other-signin";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Swords, Mail, User, Lock } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Prisma } from "@/database/prisma-client";
import { useCreateUser } from "@/lib/client-queries/users";
import Link from "next/link";

const QuestIllustration = () => (
  <div className="hidden lg:flex w-full h-full items-center justify-center bg-[#D9EFF7] p-8 rounded-2xl">
    <div className="w-full max-w-md text-center">
      <div className="mb-6">
        <Swords
          className="mx-auto h-24 w-24 text-[#4741A6] drop-shadow-lg"
          strokeWidth={1.5}
        />
      </div>
      <h2 className="text-4xl font-bold text-[#4741A6] mb-2">
        Welcome to GlucoQuest!
      </h2>
      <p className="text-lg text-gray-800">
        Your adventure in managing diabetes starts here. Track your levels,
        complete challenges, and become a health hero!
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <div className="w-24 h-24 bg-[#F9CE69] rounded-full border-4 border-white shadow-lg flex items-center justify-center -rotate-12">
          <span className="text-4xl">🏆</span>
        </div>
        <div className="w-32 h-32 bg-[#9BBBFC] rounded-full border-4 border-white shadow-lg flex items-center justify-center translate-y-4">
          <span className="text-5xl">✨</span>
        </div>
        <div className="w-20 h-20 bg-[#F9CE69] rounded-full border-4 border-white shadow-lg flex items-center justify-center rotate-12">
          <span className="text-4xl">🎯</span>
        </div>
      </div>
    </div>
  </div>
);

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { mutate, isPending } = useCreateUser();
  const [input, setInputs] = useState<Prisma.UserCreateInput>({
    email: "",
    name: "",
    password: "",
  });

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[#D9EFF7] p-4 font-sans">
      <div className="grid w-full max-w-6xl grid-cols-1 lg:grid-cols-2 gap-8">
        <QuestIllustration />

        <div className="flex items-center justify-center w-full">
          <Card className="w-full max-w-md bg-white rounded-2xl border-2 border-black shadow-[8px_8px_0px_#000]">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#D9EFF7] border-2 border-black">
                <Swords className="h-8 w-8 text-[#4741A6]" strokeWidth={2} />
              </div>
              <CardTitle className="text-3xl font-bold">
                Create Your Account
              </CardTitle>
              <CardDescription>
                Join the quest for better health!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your quest name"
                      className="pl-10 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                      required
                      name="name"
                      value={input?.name}
                      onChange={(e) =>
                        setInputs((prev) => ({ ...prev, name: e.target.value }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your quest email"
                      className="pl-10 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                      required
                      name="email"
                      value={input?.email}
                      onChange={(e) =>
                        setInputs((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your secret code"
                      className="pl-10 border-gray-200 focus:border-purple-400 focus:ring-purple-400 pr-10"
                      required
                      name="password"
                      value={input?.password}
                      onChange={(e) =>
                        setInputs((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Hide password" : "Show password"}
                      </span>
                    </Button>
                  </div>
                </div>

                <Button
                  className="w-full bg-[#4741A6] text-white font-bold text-lg h-12 rounded-lg border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-[#3b368a] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
                  onClick={() =>
                    mutate(input, {
                      onSuccess: () => router.push("/auth/signin"),
                    })
                  }
                  disabled={isPending}
                >
                  Create Account
                </Button>
              </div>
              <OtherSignIn />
              <p className="mt-6 text-center text-sm text-gray-600">
                Already a hero?{" "}
                <Link
                  href="/auth/signin"
                  className="font-bold text-[#4741A6] hover:underline"
                >
                  Log In
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
