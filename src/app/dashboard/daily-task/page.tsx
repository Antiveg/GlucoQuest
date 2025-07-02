"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  ListChecks,
  Pencil,
  Trash2,
  Clock,
} from "lucide-react";
import { format, addDays, subDays } from "date-fns";
import { Task } from "@/types";
import Link from "next/link";
import { useDailyTasksByUserId, useDeleteTaskById, useUpdateTaskCompletionStatus } from "@/lib/client-queries/tasks";
import Loading from "@/components/loading";
import ErrorBox from "@/components/error-box";

const initialTasks: Task[] = [
  {
    id: 1,
    user_id: 101,
    task: "Morning blood sugar",
    deadline: "07:00 AM",
    details: "Measure blood sugar before meal",
    done: false,
    created_at: "2025-06-13T06:50:00",
  },
  {
    id: 2,
    user_id: 101,
    task: "Morning long-acting insulin",
    deadline: "07:05 AM",
    details: "Inject basal insulin dose",
    done: true,
    created_at: "2025-06-13T06:55:00",
  },
  {
    id: 3,
    user_id: 101,
    task: "Take rapid-acting insulin (before breakfast)",
    deadline: "07:10 AM",
    details: "Inject before breakfast",
    done: false,
    created_at: "2025-06-13T07:00:00",
  },
  {
    id: 4,
    user_id: 101,
    task: "Eat breakfast",
    deadline: "07:15 AM",
    details: "",
    done: false,
    created_at: "2025-06-13T07:05:00",
  },
  {
    id: 5,
    user_id: 101,
    task: "Check blood sugar (mid-morning)",
    deadline: "10:00 AM",
    details: "",
    done: false,
    created_at: "2025-06-13T09:00:00",
  },
  {
    id: 6,
    user_id: 101,
    task: "Check blood sugar (lunch)",
    deadline: "12:00 PM",
    details: "",
    done: false,
    created_at: "2025-06-13T11:00:00",
  },
  {
    id: 7,
    user_id: 101,
    task: "Take rapid-acting insulin (lunch)",
    deadline: "12:05 PM",
    details: "Inject before lunch",
    done: false,
    created_at: "2025-06-13T11:05:00",
  },
  {
    id: 8,
    user_id: 101,
    task: "Eat lunch",
    deadline: "12:10 PM",
    details: "",
    done: false,
    created_at: "2025-06-13T11:10:00",
  },
  {
    id: 9,
    user_id: 101,
    task: "Check blood sugar (mid-afternoon)",
    deadline: "03:00 PM",
    details: "",
    done: false,
    created_at: "2025-06-13T14:00:00",
  },
  {
    id: 10,
    user_id: 101,
    task: "Check blood sugar (dinner)",
    deadline: "06:00 PM",
    details: "",
    done: false,
    created_at: "2025-06-13T17:00:00",
  },
  {
    id: 11,
    user_id: 101,
    task: "Take rapid-acting insulin (dinner)",
    deadline: "06:05 PM",
    details: "Inject before dinner",
    done: false,
    created_at: "2025-06-13T17:05:00",
  },
  {
    id: 12,
    user_id: 101,
    task: "Eat dinner",
    deadline: "06:10 PM",
    details: "",
    done: false,
    created_at: "2025-06-13T17:10:00",
  },
  {
    id: 13,
    user_id: 101,
    task: "Check blood sugar (night)",
    deadline: "09:00 PM",
    details: "",
    done: false,
    created_at: "2025-06-13T20:00:00",
  },
  {
    id: 14,
    user_id: 101,
    task: "Check final blood sugar (bedtime)",
    deadline: "10:00 PM",
    details: "",
    done: false,
    created_at: "2025-06-13T21:00:00",
  },
];

export default function DailyToDoListPage() {
  // const [tasks, setTasks] = useState(initialTasks);
  const [currentDate, setCurrentDate] = useState(new Date("2025-06-13T12:00:00Z"));
  const { data: tasks, isLoading: UserDailyTasksLoading, isError, error } = useDailyTasksByUserId(currentDate.toISOString())
  const { mutate: mutateUpdateTaskCompletionStatus, isPending: isPendingUpdate } = useUpdateTaskCompletionStatus(currentDate.toISOString())
  const { mutate: mutateDeleteTaskById, isPending: isPendingDelete } = useDeleteTaskById(currentDate.toISOString())

  // const toggleTask = (taskId: number) => {
  //   setTasks((prevTasks) =>
  //     prevTasks.map((task) =>
  //       task.id === taskId ? { ...task, done: !task.done } : task
  //     )
  //   );
  // };

  // const deleteTask = (taskId: number) => {
  //   setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  // };

  const completedTasksCount = useMemo(
    () => tasks?.filter((t) => t.done).length ?? 0
  , [tasks]);

  const progressPercentage = useMemo(
    () => ((tasks ?? []).length > 0 ? (completedTasksCount / (tasks?.length ?? 0)) * 100 : 0)
  , [completedTasksCount, tasks]);
  
  if(UserDailyTasksLoading) return <Loading message="Loading User Daily Tasks"/>
  if(isError) return <ErrorBox error={error}/>

  return (
    <div className="min-h-screen w-full bg-[#F0F8FF] font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-black flex items-center gap-2">
              <ListChecks /> Today&apos;s Quest Log
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
            </div>
          </div>
          <Link
            href="/dashboard/daily-task/add"
            className="w-full flex p-3 md:w-auto bg-[#4741A6] text-white font-bold text-md h-12 rounded-lg border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-[#3b368a] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
          >
            <Plus className="mr-2 h-5 w-5" /> Add New Task
          </Link>
        </header>

        <Card className="bg-white rounded-2xl border-2 border-black shadow-[8px_8px_0px_#000]">
          <CardHeader className="border-b-2 border-black pb-4">
            <CardTitle className="flex justify-between items-center">
              <span>Daily Progress</span>
              <span className="font-bold text-lg">
                {completedTasksCount} / {tasks?.length} Quests
              </span>
            </CardTitle>
            <Progress value={progressPercentage} className="w-full mt-2" />
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {(tasks ?? []).length > 0 ? (
              tasks?.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  isPendingUpdate={isPendingUpdate}
                  isPendingDelete={isPendingDelete}
                  mutateUpdate={({ taskId, toggle }) => mutateUpdateTaskCompletionStatus({ taskId, toggle })}
                  mutateDelete={(taskId) => mutateDeleteTaskById(taskId)}
                />
              ))
            ) : (
              <div className="text-center py-8">
                <ListChecks className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-bold">All Quests Completed!</h3>
                <p className="text-gray-500">
                  Add a new quest or enjoy your victory!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// interface Task {
//   id: number;
//   task: string;
//   done: boolean;
//   deadline: string;
//   details?: string;
// }

interface TaskItemProps {
  task: Task;
  isPendingUpdate: boolean;
  isPendingDelete: boolean;
  mutateUpdate: ({ taskId, toggle } : {taskId: number, toggle: boolean}) => void;
  mutateDelete: (taskId: number) => void;
}

const TaskItem = ({ task, isPendingUpdate, isPendingDelete, mutateUpdate, mutateDelete }: TaskItemProps) => {
  return (
    <div
      className={`flex items-start gap-4 p-4 rounded-xl transition-all ${
        task.done ? "bg-green-50" : "bg-white"
      }`}
    >
      <Checkbox
        checked={task.done}
        onCheckedChange={() => mutateUpdate({taskId: task.id, toggle: !task.done})}
        disabled={isPendingUpdate}
        id={`task-${task.id}`}
        className="h-6 w-6 mt-1 rounded-md border-2 border-black data-[state=checked]:bg-[#4741A6] data-[state=checked]:text-white"
      />
      <div className="flex-grow">
        <label
          htmlFor={`task-${task.id}`}
          className={`font-bold text-lg cursor-pointer transition-all ${
            task.done ? "line-through text-gray-400" : "text-black"
          }`}
        >
          {task.task}
        </label>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock size={14} />
          <span>{format(new Date(task.deadline), "dd/MM/yyyy HH:mm")}</span>
        </div>
        {task.details && (
          <p className="text-gray-600 mt-1 text-sm">{task.details}</p>
        )}
      </div>
      <div className="flex gap-1">
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
          <Pencil size={18} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full text-red-500 hover:text-red-600"
          onClick={() => mutateDelete(task.id)}
          disabled={isPendingDelete}
        >
          <Trash2 size={18} />
        </Button>
      </div>
    </div>
  );
};
