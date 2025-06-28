"use client";

import { useEffect } from "react";
import {
  Home,
  LogOut,
  X,
  Droplets,
  Apple,
  Swords,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  setIsMobile: (open: boolean) => void;
  isMobile: boolean;
}

export default function DashboardSidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  setIsMobile,
  isMobile,
}: SidebarProps) {
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [setIsMobile, setIsSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navItems = [
    {
      name: "Overview",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Glucose Log",
      href: "/dashboard/glucose-tracking",
      icon: <Droplets className="h-5 w-5" />,
    },
    {
      name: "Meal Planner",
      href: "/dashboard/meal-planner",
      icon: <Apple className="h-5 w-5" />,
    },
    {
      name: "Daily Tasks",
      href: "/dashboard/daily-task",
      icon: <Swords className="h-5 w-5" />,
    },
  ];

  const userName = "Alex the Adventurer";
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r-2 border-black flex flex-col transition-all duration-300 ease-in-out ${
          isMobile && !isSidebarOpen ? "-translate-x-full" : ""
        }`}
      >
        <div className="p-4 border-b-2 border-black flex items-center justify-between">
          <a href="/dashboard" className="flex items-center gap-2">
            <span className="text-2xl font-black text-[#4741A6]">Menu</span>
          </a>
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 p-3 rounded-xl font-bold transition-colors",
                  pathname === item.href
                    ? "bg-[#4741A6] text-white shadow-[3px_3px_0px_#000]"
                    : "hover:bg-[#D9EFF7] hover:text-black"
                )}
              >
                {/* <item.icon className="h-6 w-6" /> */}
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t-2 border-black space-y-2">
          <div className="flex items-center gap-3">
            {session?.user?.image ?
            <Image
              src={session.user.image}
              alt={session.user.name ?? "User"}
              width={48}
              height={48}
              className="rounded-full object-cover"
            /> :
            <div className="h-12 w-12 rounded-full bg-[#9BBBFC] flex items-center justify-center border-2 border-black">
              <span className="text-2xl font-bold">{session?.user?.name?.charAt(0).toUpperCase()}</span>
            </div>}
            <span className="font-bold text-lg truncate">{session?.user?.name ?? "#N/A"}</span>
          </div>
          <Link
            href="/"
            className="flex items-center gap-4 p-3 rounded-xl font-bold transition-colors hover:bg-[#D9EFF7] hover:text-black"
          >
            <Home className="h-4 w-4 mr-2" />
            home
          </Link>

          <Button
            variant="ghost"
            className="cursor-pointer w-full h-fit justify-start gap-4 p-3 rounded-xl font-bold text-red-600 transition-colors hover:bg-red-100"
            onClick={() => signOut({ callbackUrl: "/auth/signin" })}
          >
            <LogOut className="h-4 w-4 mr-2" />
            logout
          </Button>
        </div>
      </div>
    </div>
  );
}
