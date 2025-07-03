import { protectApiRoute } from "@/lib/auth/protect-api";
import { getUserMealsWithFoodsByUserIdService } from "@/lib/services/meal/meal-food-services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request : NextRequest) {

    const session = await protectApiRoute()
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
        const { searchParams } = new URL(request.url);
        const date = searchParams.get("date");
        const timezoneOffsetMinutes = searchParams.get("offset")

        if (!date) return NextResponse.json({ message: "Date is required" }, { status: 400 });
        const response = await getUserMealsWithFoodsByUserIdService(session.user.id, date, Number(timezoneOffsetMinutes));
        return NextResponse.json(response, { status: 200 });
    }catch (error: unknown) {
        console.error("GET /api/user/meals error:", error);
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Internal Server Error" },
            { status: 500 }
        );
    }
}