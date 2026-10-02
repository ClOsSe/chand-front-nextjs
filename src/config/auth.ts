// Match the backend token lifetime: one year from login, without renewal.
export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const authCookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  path: "/",
  maxAge: AUTH_COOKIE_MAX_AGE,
} as const;
