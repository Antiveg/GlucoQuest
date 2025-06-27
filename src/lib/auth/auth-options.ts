import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authorizeWithCredentials } from "./credential-authorize";

const providers = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "email", type: "email" },
      password: { label: "password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email) throw new Error("Missing email attribute ...");
      if (!credentials?.password) throw new Error("Missing password attribute ...");
      const user = await authorizeWithCredentials({
        email: credentials.email,
        password: credentials.password,
      });
      if (!user) throw new Error("Invalid email or password");
      return user
    },
  }),
  // (incase mau tambahin)
  // GoogleProvider({
  //   clientId: process.env.GOOGLE_CLIENT_ID!,
  //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  // }),
  // GitHubProvider({
  //   clientId: process.env.GITHUB_CLIENT_ID!,
  //   clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  // }),
]

export const authOptions: NextAuthOptions = {
  providers: providers,
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.image = user.image;
        token.email = user.email
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.name = token.name as string;
      session.user.image = token.image as string;
      session.user.email = token.email as string;
      return session;
    },
  },
};

export const enabledProviders = providers.map((p) => p.id);