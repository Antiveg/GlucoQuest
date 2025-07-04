import { NextRequest, NextResponse } from "next/server";
import { getUserByIdService, updateUserService } from "@/lib/services/user/user-basic-services";
import { protectApiRoute } from "@/lib/auth/protect-api";

export async function GET() {

    const session = await protectApiRoute();
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
        const user = await getUserByIdService(session.user.id);
        if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: error instanceof Error ? error.message : "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {

    const session = await protectApiRoute();
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        const updatedUser = await updateUserService(session.user.id, body);
        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: error instanceof Error ? error.message : "Internal Server Error" }, { status: 500 });
    }
}