import {
  requestEmailUpdate,
  RequestEmailUpdateForm,
  requestPasswordReset,
  RequestPasswordResetForm,
  requestRegistration,
  RequestRegistrationForm,
} from "@/api";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { useSession } from "./session";

// =====================================================================================================================
// MUTATIONS
// =====================================================================================================================

export const useRequestRegistration = () => {
  const { session } = useSession();

  return useMutation({
    mutationFn: (form: z.infer<typeof RequestRegistrationForm>) =>
      RequestRegistrationForm.parseAsync(form).then((form) => requestRegistration(session?.accessToken ?? "", form)),
    mutationKey: ["credentials", "request-registration"],
  });
};

export const useRequestEmailUpdate = () => {
  const { session } = useSession();

  return useMutation({
    mutationFn: (form: z.infer<typeof RequestEmailUpdateForm>) =>
      RequestEmailUpdateForm.parseAsync(form).then((form) => requestEmailUpdate(session?.accessToken ?? "", form)),
    mutationKey: ["credentials", "request-email-update"],
  });
};

export const useRequestPasswordReset = () => {
  const { session } = useSession();

  return useMutation({
    mutationFn: (form: z.infer<typeof RequestPasswordResetForm>) =>
      RequestPasswordResetForm.parseAsync(form).then((form) => requestPasswordReset(session?.accessToken ?? "", form)),
    mutationKey: ["credentials", "request-password-reset"],
  });
};
