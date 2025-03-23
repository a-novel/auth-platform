import { useCallback } from "react";

import { checkSession, createAnonymousSession, createSession, LoginForm, newRefreshToken, refreshSession } from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { useSession } from "./session";

const sessionDataQueryKey = (token: string) => ["session", "check", { token }];

const useUpdateSessionData = () => {
  const queryClient = useQueryClient();

  const { setSession } = useSession();

  return useCallback(
    async (accessToken: string, refreshToken?: string) => {
      const sessionData = await checkSession(accessToken);
      queryClient.setQueryData(sessionDataQueryKey(accessToken), { sessionData });
      setSession({ accessToken: accessToken, claims: sessionData, refreshToken });
    },
    [queryClient, setSession]
  );
};

// =====================================================================================================================
// MUTATIONS
// =====================================================================================================================

export const useCreateSession = () => {
  const sessionUpdater = useUpdateSessionData();

  return useMutation({
    mutationFn: (form: z.infer<typeof LoginForm>) => LoginForm.parseAsync(form).then((form) => createSession(form)),
    mutationKey: ["session", "create"],
    onSuccess: async (res) => {
      await sessionUpdater(res.accessToken);
    },
  });
};

export const useCreateAnonymousSession = () => {
  const sessionUpdater = useUpdateSessionData();

  return useMutation({
    mutationFn: () => createAnonymousSession(),
    mutationKey: ["session", "create"],
    onSuccess: async (res) => {
      await sessionUpdater(res.accessToken);
    },
  });
};

export const useRefreshSession = () => {
  const sessionUpdater = useUpdateSessionData();

  const { session } = useSession();

  return useMutation({
    mutationFn: () =>
      refreshSession({ accessToken: session?.accessToken ?? "", refreshToken: session?.refreshToken ?? "" }),
    mutationKey: ["session", "refresh"],
    onSuccess: async (res) => {
      await sessionUpdater(res.accessToken);
    },
  });
};

export const useNewRefreshToken = () => {
  const { session, setSession } = useSession();

  return useMutation({
    mutationFn: () => newRefreshToken(session?.accessToken ?? ""),
    mutationKey: ["session", "new-refresh-token"],
    onSuccess: (res) => {
      setSession({ ...session!, refreshToken: res });
    },
  });
};

// =====================================================================================================================
// QUERIES
// =====================================================================================================================

export const useCheckSession = () => {
  const { session } = useSession();

  return useQuery({
    queryFn: () => checkSession(session?.accessToken ?? ""),
    enabled: !!session?.accessToken,
    queryKey: sessionDataQueryKey(session?.accessToken ?? ""),
  });
};
