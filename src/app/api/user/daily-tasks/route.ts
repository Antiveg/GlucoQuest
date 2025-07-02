import { protectApiRoute } from "@/lib/auth/protect-api";
import { createUserTaskService, getDailyTasksByUserIdService } from "@/lib/services/tasks/task-services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {

    const session = await protectApiRoute();
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
        const { searchParams } = new URL(request.url);
        const date = searchParams.get("date");
        const timezoneOffsetMinutes = searchParams.get("offset")

        if (!date) return NextResponse.json({ message: "Date is required" }, { status: 400 });
        const response = await getDailyTasksByUserIdService(session.user.id, date, Number(timezoneOffsetMinutes));

        return NextResponse.json(response, { status: 200 });
    } catch (error: unknown) {
        console.error("GET /api/user/daily-tasks error:", error);
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function POST(request : NextRequest) {

    const session = await protectApiRoute()
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
        const body = await request.json();
        const response = await createUserTaskService({
            ...body,
            userId: Number(session.user.id),
        })
        return NextResponse.json(response, { status: 201 });
    }catch (error: unknown) {
        console.error("POST /api/user/daily-tasks error:", error);
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Internal Server Error" },
            { status: 500 }
        );
    }
}