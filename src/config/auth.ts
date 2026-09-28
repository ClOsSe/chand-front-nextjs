// Browsers cap cookie lifetime at 400 days, so the cookie is re-issued on
// every page visit (see middleware.ts) to keep the user logged in indefinitely.
export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 400;

export const authCookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  path: "/",
  maxAge: AUTH_COOKIE_MAX_AGE,
} as const;
