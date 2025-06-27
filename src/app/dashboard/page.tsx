"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Droplets,
  Zap,
  Apple,
  Target,
  Gem,
  Bell,
  Swords,
  User,
  AlertTriangle,
  Watch,
  Syringe,
  ArrowUp,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen w-full bg-[#F0F8FF] font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div className="flex items-center gap-3 mb-4 sm:mb-0">
            <Swords className="h-10 w-10 text-[#4741A6]" />
            <div>
              <h1 className="text-3xl font-bold text-black">Dashboard</h1>
              <p className="text-gray-600">Your health adventure summary!</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="h-12 w-12 p-0 rounded-full border-2 border-black bg-white"
            >
              <Bell className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              className="h-12 w-12 p-0 rounded-full border-2 border-black bg-white"
            >
              <User className="h-6 w-6" />
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <StatCard
                title="Glucose"
                value="125"
                unit="mg/dL"
                trend="stable"
                icon={Droplets}
                color="bg-[#9BBBFC]"
              />
              <StatCard
                title="Active Insulin"
                value="1.2"
                unit="units"
                trend="stable"
                icon={Zap}
                color="bg-[#D9EFF7]"
              />
              <StatCard
                title="Carbs Today"
                value="85"
                unit="grams"
                trend="stable"
                icon={Apple}
                color="bg-[#F9CE69]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TimeInRangeCard />
              <A1cCard />
            </div>

            <Card className="bg-white rounded-2xl border-2 border-black shadow-[8px_8px_0px_#000]">
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <ActionCard
                  title="Log Glucose"
                  icon={Droplets}
                  color="bg-blue-100"
                  textColor="text-blue-800"
                />
                <ActionCard
                  title="Log Insulin"
                  icon={Syringe}
                  color="bg-purple-100"
                  textColor="text-purple-800"
                />
                <ActionCard
                  title="Add Meal"
                  icon={Apple}
                  color="bg-yellow-100"
                  textColor="text-yellow-800"
                />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <AlertsPanel />
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  title: string;
  unit: string;
  value: string;
  trend: string;
}

const StatCard = ({ title, value, unit, icon: Icon, color }: StatCardProps) => {
  return (
    <Card
      className={`rounded-2xl border-2 border-black shadow-[8px_8px_0px_#000] overflow-hidden ${color}`}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <p className="font-bold text-gray-800">{title}</p>
          <Icon className="h-6 w-6 text-black" />
        </div>
        <p className="text-4xl font-bold text-black">{value}</p>
        <div className="flex items-center gap-1">
          <p className="text-sm text-gray-700">{unit}</p>
          <ArrowUp className="h-4 w-4 text-black" />
        </div>
      </CardContent>
    </Card>
  );
};

const TimeInRangeCard = () => (
  <Card className="bg-white rounded-2xl border-2 border-black shadow-[8px_8px_0px_#000]">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-lg font-bold">Time in Range</CardTitle>
      <Target className="h-5 w-5 text-gray-500" />
    </CardHeader>
    <CardContent>
      <p className="text-3xl font-bold">78%</p>
      <p className="text-xs text-gray-500 mb-4">Last 14 days</p>
      <div className="w-full flex h-3 rounded-full overflow-hidden border border-gray-300">
        <div
          className="bg-red-400"
          style={{ width: "8%" }}
          title="Low: 8%"
        ></div>
        <div
          className="bg-green-400"
          style={{ width: "78%" }}
          title="In Range: 78%"
        ></div>
        <div
          className="bg-yellow-400"
          style={{ width: "14%" }}
          title="High: 14%"
        ></div>
      </div>
      <div className="flex justify-between text-xs mt-1">
        <span className="text-red-600">Low</span>
        <span className="text-green-600">In Range</span>
        <span className="text-yellow-600">High</span>
      </div>
    </CardContent>
  </Card>
);

const A1cCard = () => (
  <Card className="bg-white rounded-2xl border-2 border-black shadow-[8px_8px_0px_#000]">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-lg font-bold">Est. A1c</CardTitle>
      <Gem className="h-5 w-5 text-gray-500" />
    </CardHeader>
    <CardContent>
      <p className="text-3xl font-bold">~6.8%</p>
      <p className="text-xs text-gray-500">Based on recent avg. glucose</p>
    </CardContent>
  </Card>
);

interface ActionCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  title: string;
  textColor: string;
}

const ActionCard = ({
  title,
  icon: Icon,
  color,
  textColor,
}: ActionCardProps) => (
  <Button
    className={`w-full h-24 flex flex-col justify-center items-center gap-2 rounded-xl border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all ${color} ${textColor}`}
  >
    <Icon className="h-8 w-8" />
    <span className="font-bold">{title}</span>
  </Button>
);

const AlertsPanel = () => (
  <Card className="bg-white rounded-2xl border-2 border-black shadow-[8px_8px_0px_#000] h-full">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-xl font-bold">
        <Bell className="h-6 w-6" />
        Notifications & Alerts
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <AlertItem
        icon={AlertTriangle}
        color="text-red-500"
        title="Hypo Warning"
        description="Glucose at 68 mg/dL. Consider a snack."
        time="5 min ago"
      />
      <AlertItem
        icon={AlertTriangle}
        color="text-yellow-500"
        title="Hyper Warning"
        description="Glucose rising quickly. Currently 210 mg/dL."
        time="45 min ago"
      />
      <AlertItem
        icon={Watch}
        color="text-blue-500"
        title="Missed Dose"
        description="Don't forget your long-acting insulin."
        time="2 hours ago"
      />
      <Button
        variant="outline"
        className="w-full mt-4 border-2 border-black bg-gray-50"
      >
        View All
      </Button>
    </CardContent>
  </Card>
);

interface AlertItemProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  title: string;
  description: string;
  time: string;
}

const AlertItem = ({
  icon: Icon,
  color,
  title,
  description,
  time,
}: AlertItemProps) => (
  <div className="flex items-start gap-4 p-3 rounded-lg bg-gray-50 border border-gray-200">
    <Icon className={`h-8 w-8 flex-shrink-0 mt-1 ${color}`} />
    <div>
      <p className="font-bold">{title}</p>
      <p className="text-sm text-gray-600">{description}</p>
      <p className="text-xs text-gray-400 mt-1">{time}</p>
    </div>
  </div>
);
