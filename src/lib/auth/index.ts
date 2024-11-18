import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/lib/utils/db";
import NodeCacheAdapter from "./node-cache-adapter";

export const adapter = NodeCacheAdapter(PrismaAdapter(db));

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
  providers: [
    Github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
});
