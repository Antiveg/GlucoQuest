import { NextRequest, NextResponse } from "next/server";
import { createGlucoseReadingService, deleteGlucoseReadingByIdService, getGlucoseReadingsByUserIdService } from "@/lib/services/glucose-reading/glucose-reading-services";
import { protectApiRoute } from "@/lib/auth/protect-api";

export async function GET() {

    const session = await protectApiRoute()
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
        const response = await getGlucoseReadingsByUserIdService(session.user.id)
        // console.log(response)
        return NextResponse.json(response, { status: 201 });
    }catch (error: unknown) {
        console.error("GET /api/user/glucose-readings error:", error);
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
        const response = await createGlucoseReadingService({
            ...body,
            userId: Number(session.user.id),
        })
        return NextResponse.json(response, { status: 201 });
    }catch (error: unknown) {
        console.error("POST /api/user/glucose-readings error:", error);
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Internal Server Error" },
            { status: 500 }
        );
    }
}

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