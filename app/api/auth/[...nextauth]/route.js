import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredintialsProvider from "next-auth/providers/credentials";

import { prisma } from "@/lib/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

import bcrypt from "bcrypt";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredintialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials.username || !credentials.password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username,
          },
        });

        if (!user) return null;

        const passwordMatched = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (passwordMatched) return user;
        else return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session }) {
      console.log("jwt callback: " + token, user, session );
      return token;
    },
    async session({ session, token, user }) {
      console.log("session callback: " + session, token );
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
