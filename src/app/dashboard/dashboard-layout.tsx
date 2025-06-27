"use client";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Menu } from "lucide-react";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex">
      <DashboardSidebar
        setIsMobile={setIsMobile}
        isMobile={isMobile}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div
        className={`
          flex-1 transition-all duration-300 ease-in-out
          ${isSidebarOpen && !isMobile ? "ml-64" : "ml-0"}
        `}
      >
        <header className="bg-white border-b-2 border-black sticky top-0 z-40">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center justify-between w-full">
              <h1 className="text-2xl font-black text-[#4741A6]">GlucoQuest</h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="lg:hidden rounded-lg h-10 w-10 p-2 border-2 border-black shadow-[2px_2px_0px_#000]"
              >
                <Menu />
              </Button>
              {!isSidebarOpen && !isMobile && (
                <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        </header>

        <main>{children}</main>
      </div>
    </div>
  );
}
