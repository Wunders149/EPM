import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import { validateAdminCredentials, validateDefaultAdminCredentials } from "@/lib/adminAuth";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // First, check if credentials match environment variable admin
        const isEnvAdmin = await validateAdminCredentials(credentials.email, credentials.password);
        if (isEnvAdmin) {
          return {
            id: "env-admin",
            email: credentials.email,
            name: "Environment Admin",
          };
        }

        // Then check if credentials match the default seeded admin (for backward compatibility)
        const isDefaultAdmin = await validateDefaultAdminCredentials(credentials.email, credentials.password);
        if (isDefaultAdmin) {
          return {
            id: "default-admin",
            email: credentials.email,
            name: "Default Admin",
          };
        }

        // Finally, check database users
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const isPasswordValid = await compare(credentials.password, user.password);

        if (!isPasswordValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // If the URL is relative or points to the same origin, use it as-is
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // If the URL is on the same origin, use it
      if (new URL(url).origin === baseUrl) return url;
      // Default to home page
      return baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
