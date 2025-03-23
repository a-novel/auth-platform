import { FC, useEffect } from "react";

import { ClaimsRoleEnum } from "@/api/bindings";
import { SESSION_STORAGE_KEY, SessionContextType, SessionProvider, useAccessToken, useSession } from "@/hooks/session";
import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, it, describe, expect } from "vitest";

const TestSessionRenderer: FC<{ session?: SessionContextType["session"] }> = ({ session: sessionProps }) => {
  const { session, setSession, synced } = useSession();

  useEffect(() => {
    if (synced) setSession(sessionProps);
  }, [setSession, sessionProps, synced]);

  if (!synced) {
    return <div>loading...</div>;
  }

  return <div data-testid="session">{JSON.stringify(session)}</div>;
};

const TestAccessTokenRenderer: FC = () => {
  const accessToken = useAccessToken();
  return <div data-testid="accesstoken">{accessToken}</div>;
};

export const mockSession: SessionContextType["session"] = {
  claims: {
    userID: "00000000-0000-0000-0000-000000000001",
    roles: [ClaimsRoleEnum.User],
    refreshTokenID: "00000000-0000-0000-0000-000000000002",
  },
  accessToken: "access-token",
  refreshToken: "refresh-token",
};

describe("session provider", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("returns session from context", async () => {
    render(
      <SessionProvider>
        <TestSessionRenderer />
      </SessionProvider>
    );

    let session: HTMLElement;
    await waitFor(
      () => {
        session = screen.getByTestId("session");
        expect(session).toBeDefined();
      },
      { timeout: 1000 }
    );

    await waitFor(
      () => {
        expect(session.innerHTML).toEqual("");
      },
      { timeout: 1000 }
    );
  });

  it("loads session from storage", async () => {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(mockSession));

    render(
      <SessionProvider>
        <TestSessionRenderer />
      </SessionProvider>
    );

    let session: HTMLElement;
    await waitFor(
      () => {
        session = screen.getByTestId("session");
        expect(session).toBeDefined();
      },
      { timeout: 1000 }
    );

    await waitFor(
      () => {
        expect(session.innerHTML).toEqual(JSON.stringify(mockSession));
      },
      { timeout: 1000 }
    );
  });

  it("syncs updates with local storage", async () => {
    const rendered = render(
      <SessionProvider>
        <TestSessionRenderer />
      </SessionProvider>
    );

    let session: HTMLElement;
    await waitFor(
      () => {
        session = screen.getByTestId("session");
        expect(session).toBeDefined();
      },
      { timeout: 1000 }
    );

    await waitFor(
      () => {
        expect(session.innerHTML).toEqual("");
        expect(localStorage.getItem(SESSION_STORAGE_KEY)).toBeNull();
      },
      { timeout: 1000 }
    );

    rendered.rerender(
      <SessionProvider>
        <TestSessionRenderer session={mockSession} />
      </SessionProvider>
    );

    await waitFor(
      () => {
        expect(session.innerHTML).toEqual(JSON.stringify(mockSession));
        expect(localStorage.getItem(SESSION_STORAGE_KEY)).toEqual(JSON.stringify(mockSession));
      },
      { timeout: 1000 }
    );

    rendered.rerender(
      <SessionProvider>
        <TestSessionRenderer />
      </SessionProvider>
    );

    await waitFor(
      () => {
        expect(session.innerHTML).toEqual("");
        expect(localStorage.getItem(SESSION_STORAGE_KEY)).toBeNull();
      },
      { timeout: 1000 }
    );
  });

  it("returns access token from context", async () => {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(mockSession));

    render(
      <SessionProvider>
        <TestAccessTokenRenderer />
      </SessionProvider>
    );

    let accessToken: HTMLElement;
    await waitFor(
      () => {
        accessToken = screen.getByTestId("accesstoken");
        expect(accessToken).toBeDefined();
      },
      { timeout: 1000 }
    );

    await waitFor(
      () => {
        expect(accessToken.innerHTML).toEqual("access-token");
      },
      { timeout: 1000 }
    );
  });

  it("returns empty access token from context", async () => {
    render(
      <SessionProvider>
        <TestAccessTokenRenderer />
      </SessionProvider>
    );

    let accessToken: HTMLElement;
    await waitFor(
      () => {
        accessToken = screen.getByTestId("accesstoken");
        expect(accessToken).toBeDefined();
      },
      { timeout: 1000 }
    );

    await waitFor(
      () => {
        expect(accessToken.innerHTML).toEqual("");
      },
      { timeout: 1000 }
    );
  });
});
