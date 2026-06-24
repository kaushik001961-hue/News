import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        // 1. Validate input
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // 2. Normalize email (VERY IMPORTANT)
        const email = credentials.email.toLowerCase().trim();

        console.log("LOGIN ATTEMPT:", email);

        // 3. Find user
        const user = await prisma.user.findUnique({
          where: { email },
        });

        console.log("USER FOUND:", user ? "YES" : "NO");

        if (!user) return null;

        // 4. Compare password
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        console.log("PASSWORD MATCH:", passwordMatch);

        if (!passwordMatch) return null;

        // 5. Return safe user object
        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };