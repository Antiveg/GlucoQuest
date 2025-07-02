import { protectApiRoute } from "@/lib/auth/protect-api";
import { updateTaskCompletionStatusService } from "@/lib/services/tasks/task-services";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, { params }: { params: { taskId: string } }) {

    const session = await protectApiRoute();
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {

        const { taskId } = params;
        const { done }: { done: boolean } = await request.json();

        if (done === undefined) return NextResponse.json({ message: "Done status is required" }, { status: 400 });
        const updatedTask = await updateTaskCompletionStatusService(taskId, done);

        return NextResponse.json(updatedTask, { status: 200 });
    } catch (error: unknown) {
        console.error("PATCH /api/user/daily-tasks/[taskId] error:", error);
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Internal Server Error" },
            { status: 500 }
        );
    }
}
