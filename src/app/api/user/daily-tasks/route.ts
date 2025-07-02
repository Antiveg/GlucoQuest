import { protectApiRoute } from "@/lib/auth/protect-api";
import { getDailyTasksByUserIdService } from "@/lib/services/tasks/task-services";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

    const session = await protectApiRoute();
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
        const { searchParams } = new URL(request.url);
        const date = searchParams.get("date");

        if (!date) return NextResponse.json({ message: "Date is required" }, { status: 400 });
        const response = await getDailyTasksByUserIdService(session.user.id, date);

        return NextResponse.json(response, { status: 200 });
    } catch (error: unknown) {
        console.error("GET /api/user/daily-tasks error:", error);
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Internal Server Error" },
            { status: 500 }
        );
    }
}
