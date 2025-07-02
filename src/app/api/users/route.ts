import { NextRequest, NextResponse } from "next/server";
import { createUserService, getUsersService } from "@/lib/services/user/user-basic-services";
import { protectApiRoute } from "@/lib/auth/protect-api";

export async function GET() {

    const session = await protectApiRoute()
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
        const response = await getUsersService();
        return NextResponse.json(response, { status: 201 });
    } catch (error: unknown) {
        console.error("GET /api/users error:", error);
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {

    try {
        const body = await req.json();
        const { name, email, password } = body;
        const response = await createUserService({ name, email, password });
        return NextResponse.json(response, { status: 201 });
    } catch (error: unknown) {
        console.error("POST /api/users error:", error);
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Internal Server Error" },
            { status: 500 }
        );
    }
}