import { Context, createContext, FC, ReactNode, useCallback, useContext, useEffect, useState } from "react";

import { Claims, Token } from "@/api/bindings";
import { z } from "zod";

export const Session = z.object({
  claims: Claims,
  accessToken: Token,
  refreshToken: Token.optional(),
});

export interface SessionContextType {
  /**
   * The active session for the current user.
   */
  session?: z.infer<typeof Session>;
  /**
   * Manually set the session for the current user. The session is automatically synced with local storage.
   */
  setSession: (claims?: z.infer<typeof Session>) => void;
  /**
   * Set to true once the initial session has been loaded from storage.
   */
  synced: boolean;
}

export const SessionContext: Context<SessionContextType> = createContext({
  setSession: (_?: z.infer<typeof Session>) => console.warn(`no session provider found`),
  synced: false as boolean,
});

export interface SessionProviderProps {
  children?: ReactNode;
}

export const SESSION_STORAGE_KEY = "a-novel-session";

export const SessionProvider: FC<SessionProviderProps> = ({ children }) => {
  const [session, setSessionDirect] = useState<z.infer<typeof Session>>();
  const [synced, setSynced] = useState(false);

  const setSession = useCallback((input?: z.infer<typeof Session>) => {
    if (!input) {
      setSessionDirect(undefined);
      localStorage.removeItem(SESSION_STORAGE_KEY);
      return;
    }

    Session.parseAsync(input)
      .then((inputParsed) =>
        setSessionDirect(() => {
          localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(inputParsed));
          return inputParsed;
        })
      )
      .catch(() => {
        console.error(`invalid session: ${JSON.stringify(input, null, 2)}`);
      });
  }, []);

  // Load session from storage on mount.
  useEffect(() => {
    const localSession = localStorage.getItem(SESSION_STORAGE_KEY);

    if (localSession) {
      Session.parseAsync(JSON.parse(localSession))
        .then(setSessionDirect)
        .catch(() => {
          console.error(`found invalid session in storage: ${JSON.stringify(localSession, null, 2)}\n\nremoving...`);
          localStorage.removeItem(SESSION_STORAGE_KEY);
        });
    }

    setSynced(true);
  }, []);

  return <SessionContext.Provider value={{ session, setSession, synced }}>{children}</SessionContext.Provider>;
};

export const useSession = (): SessionContextType => useContext(SessionContext);

export const useAccessToken = (): string => {
  const { session } = useSession();
  return session?.accessToken ?? "";
};
