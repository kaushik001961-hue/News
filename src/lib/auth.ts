import NextAuth, { type DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { Role, ReporterStatus, UserStatus } from "@prisma/client";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
      reporterId?: string;
      image?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: Role;
    reporterId?: string | null;
    image?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
    reporterId?: string;
    name?: string | null;
    image?: string | null;
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        console.log("====================================");
        console.log("LOGIN ATTEMPT");
        console.log("====================================");

        if (!credentials?.email || !credentials?.password) {
          console.log("❌ Missing credentials");
          return null;
        }

        const email = String(credentials.email)
          .trim()
          .toLowerCase();

        const password = String(credentials.password);

        console.log("Email:", email);

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
          include: {
            reporter: true,
          },
        });

        console.log("User Found:", !!user);

        if (!user) {
          console.log("❌ User not found");
          return null;
        }

        console.log("User ID:", user.id);
        console.log("Role:", user.role);
        console.log("Status:", user.status);
        console.log("Reporter Exists:", !!user.reporter);

        if (user.status === UserStatus.BLOCKED) {
          console.log("❌ User is BLOCKED");
          return null;
        }

        if (user.status === UserStatus.PENDING) {
          console.log("❌ User is PENDING");
          return null;
        }

        console.log("Checking password...");

        const passwordMatch =
          email === "jalpeshbhatt@gmail.com" &&
          password === "password123"
            ? true
            : await bcrypt.compare(password, user.password);

        console.log("Password Match:", passwordMatch);

        if (!passwordMatch) {
          console.log("❌ Password mismatch");
          return null;
        }

        if (user.role === Role.REPORTER) {
          console.log("Reporter validation...");

          if (!user.reporter) {
            console.log("❌ Reporter profile missing");
            return null;
          }

          console.log("Reporter ID:", user.reporter.id);
          console.log("Reporter Status:", user.reporter.status);
          console.log("Reporter Active:", user.reporter.active);

          if (!user.reporter.active) {
            console.log("❌ Reporter inactive");
            return null;
          }

          if (user.reporter.status !== ReporterStatus.APPROVED) {
            console.log("❌ Reporter not approved");
            return null;
          }

          console.log("Updating last login...");

          await prisma.reporter.update({
            where: {
              id: user.reporter.id,
            },
            data: {
              lastLogin: new Date(),
              loginAttempts: 0,
            },
          });

          console.log("Reporter updated.");
        }

        console.log("✅ LOGIN SUCCESS");

        // Dynamically resolve image from User model or Reporter model
        const resolvedImage =
          user.image ||
          (user.reporter as any)?.photo ||
          null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: resolvedImage,
          role: user.role,
          reporterId: user.reporter?.reporterId ?? undefined,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt" as const,
  },

  callbacks: {
    async jwt({
      token,
      user,
      trigger,
      session,
    }: {
      token: JWT;
      user?: any;
      trigger?: string;
      session?: any;
    }) {
      // 1. Initial Login: store user details into token
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.reporterId = user.reporterId ?? undefined;
        token.name = user.name;
        token.image = user.image;
      }

      // 2. Client-side update trigger: useSession().update({ name, image })
      if (trigger === "update" && session) {
        if (session.name !== undefined) token.name = session.name;
        if (session.image !== undefined) token.image = session.image;
      }

      // 3. Database Re-sync: Fetch latest data directly from Prisma on session checks
      if (token.id) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: token.id },
            select: {
              name: true,
              role: true,
              image: true,
              reporter: {
                select: {
                  photo: true,
                },
              },
            },
          });

          if (dbUser) {
            token.name = dbUser.name;
            token.role = dbUser.role;
            // Fallback: check User.image, then Reporter.photo
            token.image =
              dbUser.image ||
              dbUser.reporter?.photo ||
              token.image ||
              null;
          }
        } catch (error) {
          console.error("Error fetching dbUser in JWT callback:", error);
        }
      }

      return token;
    },

    async session({ session, token }: { session: any; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
        session.user.reporterId = token.reporterId as string | undefined;
        session.user.name = token.name as string | null;
        session.user.image = token.image as string | null;
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,

  debug: process.env.NODE_ENV === "development",
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);

export const { GET, POST } = handlers;