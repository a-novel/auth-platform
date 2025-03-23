import { listUsers, ListUsersParams } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { useSession } from "./session";

// =====================================================================================================================
// QUERIES
// =====================================================================================================================

export const useListUsers = (params: z.infer<typeof ListUsersParams>) => {
  const { session } = useSession();

  return useQuery({
    queryFn: () => ListUsersParams.parseAsync(params).then((params) => listUsers(session?.accessToken ?? "", params)),
    queryKey: ["users", "list", params, session?.accessToken ?? ""],
  });
};
