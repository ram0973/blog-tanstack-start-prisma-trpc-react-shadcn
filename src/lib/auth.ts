import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { reactStartCookies } from "better-auth/react-start";
import { prisma } from "./prisma";

export const auth = betterAuth({
  plugins: [reactStartCookies()],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    requireEmailVerification: false,
    enabled: true,
    autoSignIn: true,
  },
  socialProviders: {
    github: {
      clientId: import.meta.env.VITE_GITHUB_CLIENT_ID as string,
      clientSecret: import.meta.env.VITE_GITHUB_CLIENT_SECRET as string,
    },
    vk: {
      clientId: import.meta.env.VITE_VK_CLIENT_ID as string,
      clientSecret: import.meta.env.VITE_VK_CLIENT_SECRET as string,
    },
    google: {
      clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID as string,
      clientSecret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET as string,
    },
  },
});
