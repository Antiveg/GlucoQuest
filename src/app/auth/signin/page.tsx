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
import { Eye, EyeOff, Lock, Mail, Swords } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type UserCredentials = {
  email: string;
  password: string;
};

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

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string>("");
  const [input, setInputs] = useState<UserCredentials>({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleLogin = async () => {
    const res = await signIn("credentials", {
      email: input.email,
      password: input.password,
      redirect: false,
    });

    if (res?.error) {
      setLoginError(res.error);
    } else if (res?.ok) {
      router.push("/dashboard");
    } else {
      setLoginError("Server-side Error");
    }
  };

  return (
    <main className="bg-[#D9EFF7] flex min-h-screen w-full items-center justify-center p-4 font-sans">
      <div className="grid w-full max-w-6xl grid-cols-1 lg:grid-cols-2 gap-8">
        <QuestIllustration />

        <div className="flex items-center justify-center w-full">
          <Card className="w-full max-w-md bg-white rounded-2xl border-2 border-black shadow-[8px_8px_0px_#000]">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#D9EFF7] border-2 border-black">
                <Swords className="h-8 w-8 text-[#4741A6]" strokeWidth={2} />
              </div>
              <CardTitle className="text-3xl font-bold">
                Welcome Back!
              </CardTitle>
              <CardDescription>
                Enter your credentials to continue your quest.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your quest email"
                      className="pl-10 border-black"
                      name="password"
                      value={input.email}
                      onChange={(e) => {
                        setLoginError("");
                        setInputs((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }));
                      }}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="text-sm font-medium text-[#4741A6] hover:underline"
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your secret code"
                      className="pl-10 border-black"
                      name="password"
                      value={input.password}
                      onChange={(e) => {
                        setLoginError("");
                        setInputs((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }));
                      }}
                      required
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
                  onClick={() => handleLogin()}
                  className="cursor-pointer w-full bg-[#4741A6] text-white font-bold text-lg h-12 rounded-lg border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-[#3b368a] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
                >
                  Start Quest
                </Button>
              </div>

              <div className="text-red-500 text-center mt-5">
                {loginError === "" ? "\u00A0" : loginError}
              </div>

              <OtherSignIn />

              <p className="mt-6 text-center text-sm text-gray-600">
                New to the realm?{" "}
                <Link
                  href="/auth/signup"
                  className="font-bold text-[#4741A6] hover:underline"
                >
                  Create an Account
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
