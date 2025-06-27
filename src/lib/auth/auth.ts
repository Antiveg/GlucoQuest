import NextAuth, { getServerSession as getServerSessionBase } from "next-auth";
import { authOptions } from "./auth-options";

export const handler = NextAuth(authOptions);