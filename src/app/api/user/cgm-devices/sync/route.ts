import { protectApiRoute } from "@/lib/auth/protect-api";
import { updateCGMDeviceLastSyncService } from "@/lib/services/cgm-device/cgm-device-services";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request : NextRequest){

    const session = await protectApiRoute()
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
        const { did, isConnected, lastSyncAt } = await request.json();
        const response = await updateCGMDeviceLastSyncService(
            did, session.user.id, lastSyncAt, isConnected
        )
        return NextResponse.json(response, { status: 201 });
    }catch (error: unknown) {
        console.error("PATCH /api/user/cgm-devices error:", error);
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Internal Server Error" },
            { status: 500 }
        );
    }
}