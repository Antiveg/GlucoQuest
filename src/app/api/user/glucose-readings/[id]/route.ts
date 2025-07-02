import { protectApiRoute } from "@/lib/auth/protect-api";
import { deleteGlucoseReadingByIdService } from "@/lib/services/glucose-reading/glucose-reading-services";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
    const session = await protectApiRoute();
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
        const { id } = await request.json();
        if (!id || isNaN(id)) return NextResponse.json({ message: "Invalid or missing ID" }, { status: 400 });

        const response = await deleteGlucoseReadingByIdService(id, Number(session.user.id));
        return NextResponse.json(response, { status: 200 });
    } catch (error: unknown) {
        console.error("DELETE /api/glucose-reading error:", error);
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Internal Server Error" },
            { status: 500 }
        );
    }
}