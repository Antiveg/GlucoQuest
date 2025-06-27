import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/auth-options";

export async function protectApiRoute() {
    const session = await getServerSession(authOptions);
    return session ?? null;
}
