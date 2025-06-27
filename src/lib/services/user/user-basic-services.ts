import { Prisma } from "@/database/prisma-client";
import { protectApiRoute } from "@/lib/auth/protect-api";
import { queryCreateUser, queryUsers } from "@/lib/data-layers/users";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function getUsersService() {

    const session = await protectApiRoute()
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
        const users = await queryUsers();
        return {
            message: "Users fetched successfully",
            data: users,
        };
    } catch (error) {
        console.error("getUsersService error:", error);
        throw new Error(error instanceof Error ? error.message : "Internal Server Error");
    }
}


export async function createUserService(user : Prisma.UserCreateInput) {
    if (!user.name) throw new Error("User Candidate lack name attribute...");
    if (!user.email) throw new Error("User Candidate lack email attribute...");
    if (!user.password) throw new Error("User Candidate lack password attribute...");

    const userToCreate = {
        ...user,
        password: await bcrypt.hash(user.password, 10)
    }

    try {

        const createdUser = await queryCreateUser(userToCreate);
        if (!createdUser) throw new Error("Failed to create user due to unknown error.");

        return {
            message: "User created successfully.",
            user: {
                id: createdUser.id,
                email: createdUser.email,
                name: createdUser.name,
                image: createdUser.image ?? null,
                createdAt: createdUser.createdAt,
            },
        };
    } catch (error: unknown) {
        if(error instanceof Error){
            console.error(error);
            throw new Error(error.message);
        }
        console.error(error);
        throw new Error("Internal Server Error");
    }
}
