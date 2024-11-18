import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/lib/utils/db";
import AuthNodeCacheAdapter from "./node-cache-adapter";
import Google from "next-auth/providers/google";

export const adapter = AuthNodeCacheAdapter(PrismaAdapter(db));

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
  providers: [
    Github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
});
