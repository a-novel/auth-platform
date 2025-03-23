import {
  createUser,
  emailExists,
  EmailExistsParams,
  RegisterForm,
  resetPassword,
  ResetPasswordForm,
  updateEmail,
  UpdateEmailForm,
  updatePassword,
  UpdatePasswordForm,
  updateRole,
  UpdateRoleForm,
} from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { useSession } from "./session";

// =====================================================================================================================
// MUTATIONS
// =====================================================================================================================

export const useCreateUser = () => {
  const { session } = useSession();

  return useMutation({
    mutationFn: (form: z.infer<typeof RegisterForm>) =>
      RegisterForm.parseAsync(form).then((form) => createUser(session?.accessToken ?? "", form)),
    mutationKey: ["credentials", "create"],
  });
};

export const useUpdateEmail = () => {
  const { session } = useSession();

  return useMutation({
    mutationFn: (form: z.infer<typeof UpdateEmailForm>) =>
      UpdateEmailForm.parseAsync(form).then((form) => updateEmail(session?.accessToken ?? "", form)),
    mutationKey: ["credentials", "update-email"],
  });
};

export const useUpdatePassword = () => {
  const { session } = useSession();

  return useMutation({
    mutationFn: (form: z.infer<typeof UpdatePasswordForm>) =>
      UpdatePasswordForm.parseAsync(form).then((form) => updatePassword(session?.accessToken ?? "", form)),
    mutationKey: ["credentials", "update-password"],
  });
};

export const useUpdateRole = () => {
  const { session } = useSession();

  return useMutation({
    mutationFn: (form: z.infer<typeof UpdateRoleForm>) =>
      UpdateRoleForm.parseAsync(form).then((form) => updateRole(session?.accessToken ?? "", form)),
    mutationKey: ["credentials", "update-role"],
  });
};

export const useResetPassword = () => {
  const { session } = useSession();

  return useMutation({
    mutationFn: (form: z.infer<typeof ResetPasswordForm>) =>
      ResetPasswordForm.parseAsync(form).then((form) => resetPassword(session?.accessToken ?? "", form)),
    mutationKey: ["credentials", "reset-password"],
  });
};

// =====================================================================================================================
// QUERIES
// =====================================================================================================================

export const useEmailExists = (params: z.infer<typeof EmailExistsParams>) => {
  const { session } = useSession();

  return useQuery({
    queryFn: () =>
      EmailExistsParams.parseAsync(params).then((params) => emailExists(session?.accessToken ?? "", params)),
    enabled: !!session?.accessToken,
    queryKey: ["credentials", "email-exists", params, session?.accessToken ?? ""],
  });
};
