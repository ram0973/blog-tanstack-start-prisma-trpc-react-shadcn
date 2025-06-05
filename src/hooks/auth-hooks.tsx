import { authClient } from "@/lib/auth/auth-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import type { ErrorContext } from "better-auth/react";
import type { SocialProvider } from "better-auth/social-providers";

const authQueryKeys = {
  session: ["session"],
};

export const useSession = () => {
  const session = authClient.useSession();
  return session;
};

export const useLogin = () => {
  const router = useRouter();
  const loginWithCredentials = useMutation({
    mutationFn: async ({
      email,
      password,
      rememberMe,
    }: { email: string; password: string; rememberMe: boolean }) => {
      await authClient.signIn.email({
        email,
        password,
        rememberMe,
        fetchOptions: {
          onSuccess: () => {
            console.log("loginWithCredentials onSuccess");
            router.navigate({ to: "/dashboard" });
          },
        },
      });
    },
  });

  return {
    loginWithCredentials,
  };
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async () => await authClient.signOut(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: authQueryKeys.session });
      router.navigate({ to: "/login" });
    },
  });
};

export const useRegister = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: ErrorContext) => void;
}) => {
  return useMutation({
    mutationFn: async ({
      email,
      password,
      name,
    }: { email: string; password: string; name: string }) =>
      await authClient.signUp.email(
        { email, password, name },
        {
          onSuccess: () => {
            onSuccess();
          },
          onError: (error: ErrorContext) => {
            onError(error);
          },
        },
      ),
  });
};

export const useAuthHelpers = () => {
  const forgotPassword = useMutation({
    mutationFn: async ({ email }: { email: string }) =>
      await authClient.forgetPassword({ email, redirectTo: "/reset-password" }),
  });

  const resetPassword = useMutation({
    mutationFn: async ({
      newPassword,
      token,
    }: { newPassword: string; token: string }) =>
      await authClient.resetPassword({ newPassword, token }),
  });

  return {
    forgotPassword,
    resetPassword,
  };
};
