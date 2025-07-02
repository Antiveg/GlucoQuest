"use client"

import OtherSignIn from "@/components/other-signin"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Heart, Trophy, Target } from "lucide-react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export type UserCredentials = {
  email: string;
  password: string;
};

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState<String>("")
  const [input, setInputs] = useState<UserCredentials>({
    email: "",
    password: ""
  })
  const router = useRouter()

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
      setLoginError("Server-side Error")
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
        <Heart className="w-8 h-8 text-red-500" />
      </div>
      <div className="absolute top-40 left-20 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
        <Trophy className="w-6 h-6 text-yellow-600" />
      </div>
      <div className="absolute bottom-32 right-32 w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center">
        <Target className="w-7 h-7 text-purple-600" />
      </div>

      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-xl border-0">
        <CardHeader className="space-y-3 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <span className="text-xl font-bold text-purple-600">GlucoQuest</span>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">Welcome Back, Hero!</CardTitle>
          <CardDescription className="text-gray-600">
            Ready to continue your health adventure? Log in to track your progress.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-medium">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your quest email"
              className="border-gray-200 focus:border-purple-400 focus:ring-purple-400"
              name="password"
              value={input.email}
              onChange={(e) => {
                setLoginError("")
                setInputs((prev) => ({...prev, email: e.target.value}))
              }}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700 font-medium">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your secret code"
                className="border-gray-200 focus:border-purple-400 focus:ring-purple-400 pr-10"
                name="password"
                value={input.password}
                onChange={(e) => {
                  setLoginError("")
                  setInputs((prev) => ({...prev, password: e.target.value}))
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
                <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                disabled
              />
              <Label htmlFor="remember" className="text-sm text-gray-600">
                Keep me logged in
              </Label>
            </div>
            <Button variant="link" className="px-0 text-purple-600 hover:text-purple-700" disabled>
              Forgot password?
            </Button>
          </div>

          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg transform transition hover:scale-105"
          onClick={() => handleLogin()}>
            Start Your Quest
          </Button>

          <CardDescription className="text-red-500 text-center">
            {loginError === "" ? "\u00A0" : loginError}
          </CardDescription>

          <OtherSignIn/>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              {"New to the quest? "}
              <Button variant="link" className="px-0 text-purple-600 hover:text-purple-700 font-semibold" onClick={() => router.push('/auth/signup')}>
                Join the Adventure
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}