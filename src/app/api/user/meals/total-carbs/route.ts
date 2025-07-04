import { protectApiRoute } from "@/lib/auth/protect-api";
import { getTotalCarbsByUserIdService } from "@/lib/services/meal/meal-food-services";
import { NextResponse } from "next/server";

export async function GET() {

    const session = await protectApiRoute()
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
        const response = await getTotalCarbsByUserIdService(session.user.id);
        return NextResponse.json(response, { status: 200 });
    }catch (error: unknown) {
        console.error("GET /api/user/meals/total-carbs error:", error);
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Internal Server Error" },
            { status: 500 }
        );
    }
}