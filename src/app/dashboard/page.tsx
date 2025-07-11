"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Droplets,
  Apple,
  Bell,
  Swords,
  User,
  AlertTriangle,
  Calendar,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Loading from "@/components/loading";
import { ReminderCarousel } from "@/components/dashboard/ReminderCarousel";
import Link from "next/link";
import { useRecentNotificationsByUserId } from "@/lib/client-queries/notifications";
import { useMostRecentGlucoseReadingByUserId } from "@/lib/client-queries/glucose-readings";
import { useFetchTotalCarbsByUserId } from "@/lib/client-queries/meals-with-foods";
import { formatDateTimeUTC } from "@/lib/utils";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const {
    data: notifications,
    isLoading: notificationsLoading,
    isError: notificationsIsError,
    error: notificationsError,
  } = useRecentNotificationsByUserId();

  const {
    data: glucoseReading,
    isLoading: glucoseReadingLoading,
    isError: glucoseReadingIsError,
    error: glucoseReadingError,
  } = useMostRecentGlucoseReadingByUserId();

  const {
    data: totalCarbs,
    isLoading: totalCarbsLoading,
    isError: totalCarbsIsError,
    error: totalCarbsError,
  } = useFetchTotalCarbsByUserId();

  if (status === "loading")
    return <Loading message="Loading User Information ..." />;

  // if (notificationsLoading) return <p>Loading notifications...</p>;
  // if (isError) return <p>Error: {error.message}</p>;
  // if (!notifications || notifications.length === 0)
  //   return <p>No notifications yet.</p>;

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
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
              <Card
                className={`rounded-2xl border-2 border-black shadow-[8px_8px_0px_#000] overflow-hidden bg-[#9BBBFC]`}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-bold text-gray-800">Glucose</p>
                    <Droplets className="h-6 w-6 text-black" />
                  </div>
                  {glucoseReadingLoading ? (
                    <p className="text-center text-gray-700 italic">
                      Loading...
                    </p>
                  ) : glucoseReadingIsError ? (
                    <p className="text-center text-gray-700 italic">
                      {/* Error: {glucoseReadingError.message} */}
                      No reading
                    </p>
                  ) : !glucoseReading ? (
                    <p className="text-center text-gray-700 italic">
                      No reading.
                    </p>
                  ) : (
                    <>
                      <p className="text-4xl font-bold text-black">
                        {glucoseReading.glucose}
                      </p>
                      <div className="flex items-center gap-1">
                        <p className="text-sm text-gray-700">mg/dL</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
              <Card
                className={`rounded-2xl border-2 border-black shadow-[8px_8px_0px_#000] overflow-hidden bg-[#F9CE69]`}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-bold text-gray-800">Carbs Today</p>
                    <Apple className="h-6 w-6 text-black" />
                  </div>
                  {totalCarbsLoading ? (
                    <p className="text-center text-gray-700 italic">
                      Loading...
                    </p>
                  ) : totalCarbsIsError ? (
                    <p className="text-center text-gray-700 italic">
                      {/* Error: {totalCarbsError.message} */}
                      No reading
                    </p>
                  ) : !totalCarbs ? (
                    <p className="text-center text-gray-700 italic">
                      No reading.
                    </p>
                  ) : (
                    <>
                      <p className="text-4xl font-bold text-black">
                        {totalCarbs}
                      </p>
                      <div className="flex items-center gap-1">
                        <p className="text-sm text-gray-700">grams</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
              {/* <StatCard
                title="Glucose"
                value={glucoseReading.glucose}
                unit="mg/dL"
                trend="stable"
                icon={Droplets}
                color="bg-[#9BBBFC]"
              /> */}
              {/* <StatCard
                title="Carbs Today"
                value="85"
                unit="grams"
                trend="stable"
                icon={Apple}
                color="bg-[#F9CE69]"
              /> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              <ReminderCarousel />
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
                  link="/dashboard/glucose-tracking"
                />
                <ActionCard
                  title="Daily Task"
                  icon={Calendar}
                  color="bg-purple-100"
                  textColor="text-purple-800"
                  link="/dashboard/daily-task"
                />
                <ActionCard
                  title="Add Meal"
                  icon={Apple}
                  color="bg-yellow-100"
                  textColor="text-yellow-800"
                  link="/dashboard/meal-planner"
                />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="bg-white rounded-2xl border-2 border-black shadow-[8px_8px_0px_#000] h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-bold">
                  <Bell className="h-6 w-6" />
                  Notifications & Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {notificationsLoading ? (
                  <p>Loading notifications...</p>
                ) : notificationsIsError ? (
                  <p>Error: {notificationsError.message}</p>
                ) : !notifications || notifications.length === 0 ? (
                  <p>No notifications yet.</p>
                ) : (
                  <>
                    {notifications.map((notification) => (
                      <AlertItem
                        key={notification.id}
                        icon={AlertTriangle}
                        color="text-blue-500"
                        title={notification.title}
                        description={notification.description}
                        time={
                          notification.createdAt
                        }
                      />
                    ))}

                    <Button
                      variant="outline"
                      className="w-full mt-4 border-2 border-black bg-gray-50"
                    >
                      View All
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ActionCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  title: string;
  textColor: string;
  link: string;
}

const ActionCard = ({
  title,
  icon: Icon,
  color,
  textColor,
  link,
}: ActionCardProps) => (
  <Link
    className={`w-full h-24 flex flex-col justify-center items-center gap-2 rounded-xl border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all ${color} ${textColor}`}
    href={link}
  >
    <Icon className="h-8 w-8" />
    <span className="font-bold">{title}</span>
  </Link>
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
      <p className="text-xs text-gray-400 mt-1">{formatDateTimeUTC(time)}</p>
    </div>
  </div>
);
