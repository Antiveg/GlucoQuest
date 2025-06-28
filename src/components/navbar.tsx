import { Swords } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession()
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b-2 border-black">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Swords className="h-8 w-8 text-[#4741A6]" />
          <span className="text-2xl font-black text-[#4741A6]">GlucoQuest</span>
        </div>
        <div className="hidden md:flex items-center gap-6 font-semibold">
          <Link href="#features" className="hover:text-[#4741A6]">
            Features
          </Link>
          <Link href="#testimonials" className="hover:text-[#4741A6]">
            Awareness
          </Link>
          <Link href="#pricing" className="hover:text-[#4741A6]">
            About
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {session ?
          <>
          <Link
            href="/dashboard"
            className="bg-[#F9CE69] px-4 py-2 rounded-xl text-black font-bold border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-yellow-400 active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
          >
            Dashboard
          </Link>
          </> :
          <>
          <Link
            href="/auth/signin"
            className="font-bold px-4 py-2 rounded-xl hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50"
          >
            Log In
          </Link>
          <Link
            href="/auth/signup"
            className="bg-[#F9CE69] px-4 py-2 rounded-xl text-black font-bold border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-yellow-400 active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
          >
            Sign Up
          </Link>
          </>}
        </div>
      </nav>
    </header>
  );
}
