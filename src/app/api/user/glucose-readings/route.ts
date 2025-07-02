import { NextRequest, NextResponse } from "next/server";
import { deleteGlucoseReadingByIdService, getGlucoseReadingsByUserIdService } from "@/lib/services/glucose-reading/glucose-reading-services";
import { protectApiRoute } from "@/lib/auth/protect-api";

export async function GET() {

    const session = await protectApiRoute()
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
        const response = await getGlucoseReadingsByUserIdService(session.user.id)
        // console.log(response)
        return NextResponse.json(response, { status: 201 });
    }catch (error: unknown) {
        console.error("GET /api/users error:", error);
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Internal Server Error" },
            { status: 500 }
        );
    }
}