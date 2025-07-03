import { protectApiRoute } from "@/lib/auth/protect-api";
import { createUserFoodService, deleteUserFoodService, getUserFoodsService } from "@/lib/services/food/food-services";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {

    const session = await protectApiRoute()
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
        const response = await getUserFoodsService(session.user.id);
        return NextResponse.json(response, { status: 201 });
    } catch (error: unknown) {
        console.error("GET /api/user/foods error:", error);
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
        const { food } = await request.json()
        const response = await createUserFoodService({ userId: session.user.id, ...food });
        return NextResponse.json(response, { status: 201 });
    } catch (error: unknown) {
        console.error("POST /api/user/foods error:", error);
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function DELETE(request : NextRequest) {

    const session = await protectApiRoute()
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
        const { fid } = await request.json()
        const response = await deleteUserFoodService(session.user.id, fid);
        return NextResponse.json(response, { status: 201 });
    } catch (error: unknown) {
        console.error("DELETE /api/user/foods error:", error);
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Internal Server Error" },
            { status: 500 }
        );
    }
}