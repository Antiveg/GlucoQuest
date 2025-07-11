"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Trash2,
  AlertTriangle,
  History,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ReferenceLine,
} from "recharts";
import { format, addDays, subDays } from "date-fns";
import Link from "next/link";
import { GlucoseReading } from "@/types";
import Loading from "@/components/loading";
import { useDeleteUserGlucoseReadingById, useGlucoseReadingsByUserId } from "@/lib/client-queries/glucose-readings";
import ErrorBox from "@/components/error-box";

// const UserGlucoseReadings: GlucoseReading[] = [
//   {
//     id: 1,
//     user_id: 101,
//     time: "2025-06-13T07:00:00",
//     glucose: 95,
//     tag: "Fasting",
//     notes: "Woke up feeling good",
//     created_at: "2025-06-13T07:05:00",
//   },
//   {
//     id: 2,
//     user_id: 101,
//     time: "2025-06-13T09:30:00",
//     glucose: 165,
//     tag: "After Breakfast",
//     notes: "Oatmeal & berries",
//     created_at: "2025-06-13T09:35:00",
//   },
//   {
//     id: 3,
//     user_id: 101,
//     time: "2025-06-13T12:45:00",
//     glucose: 110,
//     tag: "Before Lunch",
//     notes: "",
//     created_at: "2025-06-13T12:50:00",
//   },
//   {
//     id: 4,
//     user_id: 101,
//     time: "2025-06-13T14:30:00",
//     glucose: 185,
//     tag: "After Lunch",
//     notes: "Sandwich and chips",
//     created_at: "2025-06-13T14:35:00",
//   },
//   {
//     id: 5,
//     user_id: 101,
//     time: "2025-06-13T18:00:00",
//     glucose: 75,
//     tag: "Before Dinner",
//     notes: "Felt a little shaky",
//     created_at: "2025-06-13T18:05:00",
//   },
//   {
//     id: 6,
//     user_id: 101,
//     time: "2025-06-13T20:00:00",
//     glucose: 140,
//     tag: "After Dinner",
//     notes: "Chicken and rice",
//     created_at: "2025-06-13T20:05:00",
//   },
//   {
//     id: 7,
//     user_id: 101,
//     time: "2025-06-13T22:30:00",
//     glucose: 120,
//     tag: "Bedtime",
//     notes: "",
//     created_at: "2025-06-13T22:35:00",
//   },
// ];

export default function DailyGlucosePage() {

  const [currentDate, setCurrentDate] = useState(() => {
    const now = new Date();
    return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0));
  });
  const [unit, setUnit] = useState<"mg/dL" | "mmol/L">("mg/dL");

  const { data: UserGlucoseReadings, isLoading: UserGlucoseReadingsLoading, isError, error } = useGlucoseReadingsByUserId(currentDate.toISOString())
  const { mutate, isPending } = useDeleteUserGlucoseReadingById(currentDate.toISOString())

  // --- CALCULATIONS ---
  const dailyStats = useMemo(() => {
    if (UserGlucoseReadings?.length === 0) {
      return {
        avg: 0,
        high: { glucose: 0 },
        low: { glucose: 0 },
        timeInRange: 0,
      };
    }
    const values = UserGlucoseReadings?.map((d) => d.glucose);
    const avg = values?.length ? Math.round(values?.reduce((a, b) => a + b, 0) / values.length) : 0;
    const high = UserGlucoseReadings?.reduce((p, c) =>
      p.glucose > c.glucose ? p : c
    );
    const low = UserGlucoseReadings?.reduce((p, c) =>
      p.glucose < c.glucose ? p : c
    );
    const inRangeCount = values?.filter((v) => v >= 70 && v <= 180).length ?? 0;
    const timeInRange = values?.length ? Math.round((inRangeCount / values.length) * 100) : 0;
    return { avg, high, low, timeInRange };
  }, [UserGlucoseReadings]);

  const chartData = useMemo(() => {
    if (!UserGlucoseReadings || UserGlucoseReadings.length === 0) return []
    return UserGlucoseReadings.map((d) => ({
      ...d,
      name: format(new Date(d.time), "HH:mm"),
      glucose: unit === "mmol/L" ? (d.glucose / 18).toFixed(1) : d.glucose,
    }));
  }, [unit, UserGlucoseReadings, currentDate]);
  
  const outOfRangeAlerts: GlucoseReading[] = UserGlucoseReadings ? UserGlucoseReadings.filter(
    (d) => d.glucose < 70 || d.glucose > 180
  ) : [];

  if(UserGlucoseReadingsLoading) return <Loading message="Loading User Glucose Loading"/>
  if(isError) return <ErrorBox error={error}/>

  return (
    <div className="min-h-screen w-full bg-[#F0F8FF] font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-black">
              Today`s Glucose Overview
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <Button
                onClick={() => setCurrentDate(subDays(currentDate, 1))}
                variant="outline"
                className="h-10 w-10 p-0 rounded-lg border-2 border-black bg-white"
              >
                <ChevronLeft />
              </Button>
              <span className="text-lg font-semibold text-gray-700">
                {format(currentDate, "MMMM d, yyyy")}
              </span>
              <Button
                onClick={() => setCurrentDate(addDays(currentDate, 1))}
                variant="outline"
                className="h-10 w-10 p-0 rounded-lg border-2 border-black bg-white"
              >
                <ChevronRight />
              </Button>
              <input
                type="date"
                value={format(currentDate, "yyyy-MM-dd")}
                onChange={(e) => {
                  const [year, month, day] = e.target.value.split("-");
                  const selectedDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), 0, 0, 0));
                  setCurrentDate(selectedDate);
                }}
                className="h-10 rounded-lg border-2 border-black bg-white px-2 text-sm"
                max={format(new Date(), "yyyy-MM-dd")}
              />
            </div>
          </div>
          <Link
            href="/dashboard/glucose-tracking/add"
            className="w-full p-6 md:w-auto bg-[#4741A6] text-white font-bold text-md h-12 rounded-lg border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-[#3b368a] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add Glucose Reading
          </Link>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <Card className="bg-white rounded-2xl border-2 border-black shadow-[8px_8px_0px_#000]">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-bold">
                    Glucose Trend
                  </CardTitle>
                  <div className="flex items-center gap-1 border-2 border-black rounded-lg p-1">
                    <Button
                      onClick={() => setUnit("mg/dL")}
                      size="sm"
                      className={`h-8 rounded-md px-3 ${
                        unit === "mg/dL"
                          ? "bg-[#9BBBFC] text-black"
                          : "bg-transparent text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      mg/dL
                    </Button>
                    {/* <Button
                      onClick={() => setUnit("mmol/L")}
                      size="sm"
                      className={`h-8 rounded-md px-3 ${
                        unit === "mmol/L"
                          ? "bg-[#9BBBFC] text-black"
                          : "bg-transparent text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      mmol/L
                    </Button> */}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="h-[350px] w-full pr-8">
                <ResponsiveContainer>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                    <XAxis dataKey="name" stroke="#333" />
                    <YAxis
                      stroke="#333"
                      domain={["dataMin - 20", "dataMax + 20"]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "2px solid black",
                        borderRadius: "12px",
                      }}
                    />
                    <Legend />
                    <ReferenceLine
                      y={180}
                      label="High"
                      stroke="orange"
                      strokeDasharray="4 4"
                    />
                    <ReferenceLine
                      y={70}
                      label="Low"
                      stroke="red"
                      strokeDasharray="4 4"
                    />
                    <Line
                      type="monotone"
                      dataKey="glucose"
                      stroke="#4741A6"
                      strokeWidth={3}
                      dot={{ r: 5, strokeWidth: 2, fill: "#fff" }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-bold mb-3">Daily Summary</h2>
                <div className="grid grid-cols-2 gap-4">
                  <SummaryStatCard
                    title="Average"
                    value={dailyStats.avg}
                    unit={unit}
                    icon={TrendingUp}
                    color="bg-blue-100"
                  />
                  <SummaryStatCard
                    title="Time in Range"
                    value={dailyStats.timeInRange}
                    unit="%"
                    icon={History}
                    color="bg-green-100"
                  />
                  <SummaryStatCard
                    title="Highest"
                    value={dailyStats?.high?.glucose ?? 0}
                    unit={unit}
                    subtext={`at ${format(Date.now(), "HH:mm")}`}
                    icon={ArrowUp}
                    color="bg-orange-100"
                  />
                  <SummaryStatCard
                    title="Lowest"
                    value={dailyStats?.low?.glucose ?? 0}
                    unit={unit}
                    subtext={`at ${format(Date.now(), "HH:mm")}`}
                    icon={ArrowDown}
                    color="bg-red-100"
                  />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-3">Out-of-Range Alerts</h2>
                <div className="space-y-3">
                  {outOfRangeAlerts && outOfRangeAlerts.length > 0 ? (
                    outOfRangeAlerts.map((alert, index) => (
                      <AlertCard key={index} alert={alert} unit={unit} />
                    ))
                  ) : (
                    <Card className="p-4 border-2 border-black rounded-xl bg-green-50">
                      <p className="text-center font-semibold text-green-800">
                        Great job! All readings are in range.
                      </p>
                    </Card>
                  )}
                </div>
              </div>
            </div>

            <Card className="bg-white rounded-2xl border-2 border-black shadow-[8px_8px_0px_#000]">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Reading Log</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold">Time</TableHead>
                      <TableHead className="font-bold">
                        Glucose ({unit})
                      </TableHead>
                      <TableHead className="font-bold">Tag</TableHead>
                      <TableHead className="hidden md:table-cell font-bold">
                        Notes
                      </TableHead>
                      <TableHead className="text-right font-bold">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {UserGlucoseReadings && UserGlucoseReadings
                    .map((reading : GlucoseReading) => (
                      <TableRow key={reading.id}>
                        <TableCell className="font-medium">
                          {format(new Date(reading.time), "HH:mm")}
                        </TableCell>
                        <TableCell className="font-semibold text-lg">
                          {unit === "mmol/L"
                            ? (reading.glucose / 18).toFixed(1)
                            : reading.glucose}
                        </TableCell>
                        <TableCell>
                          <TagLabel tag={reading.tag.toString()} />
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-gray-600">
                          {reading.notes || "..."}
                        </TableCell>
                        <TableCell className="text-right">
                          {/* <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full h-8 w-8 mr-1"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button> */}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full h-8 w-8 text-red-500"
                            onClick={() => mutate(reading.id)}
                            disabled={isPending}
                          >
                            {isPending ?
                            <div className="h-4 w-4 border-4 border-t-4 border-red-500 border-solid rounded-full animate-spin" />: <Trash2 className="h-4 w-4" />}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SummaryStatCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  title: string;
  unit: string;
  value: number;
  subtext?: string;
}

const SummaryStatCard = ({
  title,
  value,
  unit,
  subtext,
  icon: Icon,
  color,
}: SummaryStatCardProps) => (
  <Card className={`rounded-xl border-2 border-black p-4 ${color}`}>
    <div className="flex items-center justify-between">
      <p className="font-bold text-gray-800">{title}</p>
      <Icon className="h-5 w-5 text-black" />
    </div>
    <p className="text-2xl font-bold text-black mt-1">
      {value} {title.includes("Time") ? "" : unit}
    </p>
    {subtext && <p className="text-xs text-gray-600">{subtext}</p>}
  </Card>
);

interface AlertCardProps {
  alert: GlucoseReading;
  unit: string;
}

const AlertCard = ({ alert, unit }: AlertCardProps) => {
  const isHigh = alert.glucose > 180;
  return (
    <div
      className={`flex items-center gap-4 p-3 rounded-xl border-2 border-black ${
        isHigh ? "bg-orange-100" : "bg-red-100"
      }`}
    >
      <AlertTriangle
        className={`h-6 w-6 flex-shrink-0 ${
          isHigh ? "text-orange-500" : "text-red-500"
        }`}
      />
      <div>
        <p className="font-bold">{isHigh ? "High Reading" : "Low Reading"}</p>
        <p className="text-sm text-gray-800">
          <span className="font-semibold">
            {unit === "mmol/L"
              ? (alert.glucose / 18).toFixed(1)
              : alert.glucose}{" "}
            {unit}
          </span>{" "}
          at {format(new Date(alert.time), "HH:mm")}
        </p>
      </div>
    </div>
  );
};

interface TagLabelProps {
  tag: string;
}

const TagLabel = ({ tag }: TagLabelProps) => {
  const colors = {
    Fasting: "bg-sky-200 text-sky-800",
    "After Meal": "bg-purple-200 text-purple-800",
    "Before Meal": "bg-pink-200 text-pink-800",
    Bedtime: "bg-indigo-200 text-indigo-800",
    default: "bg-gray-200 text-gray-800",
  };
  const key = (Object.keys(colors).find((k) => tag.includes(k)) ||
    "default") as keyof typeof colors;
  return (
    <span
      className={`px-2 py-1 text-xs font-semibold rounded-full ${colors[key]}`}
    >
      {tag}
    </span>
  );
};
