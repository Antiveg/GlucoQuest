"use client";

import OtherSignIn from "@/components/other-signin";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Heart, Trophy, Target, Swords } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation";
import { Prisma } from "@/database/prisma-client";
import { useCreateUser } from "@/lib/client-queries/users";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const { mutate, isPending } = useCreateUser()
  const [input, setInputs] = useState<Prisma.UserCreateInput>({
    email: "",
    name: "",
    password: "",
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 flex items-center justify-center px-4 relative overflow-hidden">
      
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
            <Swords className="h-8 w-8 text-[#4741A6]" />
            <span className="text-xl font-bold text-purple-600">GlucoQuest</span>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">Hello There!</CardTitle>
          <CardDescription className="text-gray-600">
            Ready to embark on your own health adventure? Sign up right now, right here.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-700 font-medium">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your quest name"
              className="border-gray-200 focus:border-purple-400 focus:ring-purple-400"
              required
              name="name"
              value={input?.name}
              onChange={(e) => setInputs((prev) => ({ ...prev, name: e.target.value}))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-medium">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your quest email"
              className="border-gray-200 focus:border-purple-400 focus:ring-purple-400"
              required
              name="email"
              value={input?.email}
              onChange={(e) => setInputs((prev) => ({ ...prev, email: e.target.value}))}
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
                required
                name="password"
                value={input?.password}
                onChange={(e) => setInputs((prev) => ({ ...prev, password: e.target.value}))}
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

          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg transform transition hover:scale-105"
          onClick={() => mutate(input, { onSuccess: () => router.push('/auth/signin')})}
          disabled={isPending}>
            Start Your Quest
          </Button>

          <OtherSignIn/>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              {"New to the quest? "}
              <Button variant="link" className="px-0 text-purple-600 hover:text-purple-700 font-semibold"
              onClick={() => router.push('/auth/signin')}>
                Join the Adventure
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}