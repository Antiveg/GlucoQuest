import { protectApiRoute } from "@/lib/auth/protect-api";
import { createUserCGMDeviceService, getCGMDeviceByUserIdService } from "@/lib/services/cgm-device/cgm-device-services";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {

    const session = await protectApiRoute()
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
        const response = await getCGMDeviceByUserIdService(session.user.id);
        return NextResponse.json(response, { status: 200 });
    }catch (error: unknown) {
        console.error("GET /api/user/cgm-devices error:", error);
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
        const response = await createUserCGMDeviceService({
            ...body,
            userId: Number(session.user.id),
        })
        return NextResponse.json(response, { status: 201 });
    }catch (error: unknown) {
        console.error("POST /api/user/cgm-devices error:", error);
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Internal Server Error" },
            { status: 500 }
        );
    }
}