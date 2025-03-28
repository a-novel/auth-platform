import { describe, it, expect } from "vitest";

import { authPath, withAuthHeaders, withDefaultHeaders } from "./common";

describe("auth path", () => {
  it("should have api env defined", () => {
    expect(process.env.AUTH_API).toBeDefined();
    expect(process.env.AUTH_API).toMatch(new RegExp(`^https://`));
  });

  it("should append the path to the base defined in environment", () => {
    expect(authPath("/session").toString()).toEqual(`${process.env.AUTH_API}/session`);
    expect(authPath("/session?foo").toString()).toEqual(`${process.env.AUTH_API}/session?foo`);
  });

  it("should append query parameters", () => {
    const params = new URLSearchParams();
    params.append("foo", "bar");
    params.append("baz", "qux");
    params.append("baz", "quux");

    expect(authPath("", params)).toEqual(new URL(`${process.env.AUTH_API}?foo=bar&baz=qux&baz=quux`));
  });
});

describe("headers", () => {
  describe("default headers", () => {
    it("should return the default headers", () => {
      expect(withDefaultHeaders()).toEqual({
        headers: { "Content-Type": "application/json" },
      });
    });

    it("should merge custom headers", () => {
      expect(withDefaultHeaders({ method: "PUT" })).toEqual({
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });

      expect(withDefaultHeaders({ method: "PUT", headers: { "X-custom": "foo" } })).toEqual({
        method: "PUT",
        headers: { "Content-Type": "application/json", "X-custom": "foo" },
      });
    });

    it("should not override conflicting values", () => {
      expect(withDefaultHeaders({ method: "PUT", headers: { "Content-Type": "text/plain" } })).toEqual({
        method: "PUT",
        headers: { "Content-Type": "text/plain" },
      });
    });
  });

  describe("auth headers", () => {
    it("should return the default headers", () => {
      expect(withAuthHeaders("access-token")).toEqual({
        headers: { "Content-Type": "application/json", Authorization: "Bearer access-token" },
      });
    });

    it("should merge custom headers", () => {
      expect(withAuthHeaders("access-token", { method: "PUT" })).toEqual({
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: "Bearer access-token" },
      });

      expect(withAuthHeaders("access-token", { method: "PUT", headers: { "X-custom": "foo" } })).toEqual({
        method: "PUT",
        headers: { "Content-Type": "application/json", "X-custom": "foo", Authorization: "Bearer access-token" },
      });
    });

    it("should not override conflicting values", () => {
      expect(withAuthHeaders("access-token", { method: "PUT", headers: { Authorization: "foo" } })).toEqual({
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: "foo" },
      });
    });
  });
});
