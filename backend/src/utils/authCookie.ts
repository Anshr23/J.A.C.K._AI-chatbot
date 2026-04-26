import type { CookieOptions, Response } from 'express';

const isProduction = process.env.NODE_ENV === 'production';
const sameSiteRaw = (process.env.COOKIE_SAME_SITE || (isProduction ? 'none' : 'lax')).toLowerCase();
const sameSite: 'none' | 'lax' | 'strict' = ['none', 'lax', 'strict'].includes(sameSiteRaw)
  ? (sameSiteRaw as 'none' | 'lax' | 'strict')
  : isProduction
  ? 'none'
  : 'lax';
const cookieDomain = isProduction ? (process.env.COOKIE_DOMAIN || process.env.cookie_domain) : undefined;
const isSecureCookie = sameSite === 'none' ? true : isProduction;

export const COOKIE_NAME = process.env.COOKIE_NAME;

export const createAuthCookieOptions = (expires?: Date): CookieOptions => {
  const options: CookieOptions = {
    path: '/',
    httpOnly: true,
    signed: true,
    secure: isSecureCookie,
    sameSite,
  };

  if (expires) {
    options.expires = expires;
  }

  if (cookieDomain) {
    options.domain = cookieDomain;
  }

  return options;
};

export const setAuthCookie = (res: Response, token: string, expires: Date) => {
  if (!COOKIE_NAME) {
    throw new Error('COOKIE_NAME is not defined in environment variables');
  }

  res.clearCookie(COOKIE_NAME, createAuthCookieOptions());
  res.cookie(COOKIE_NAME, token, createAuthCookieOptions(expires));
};

export const clearAuthCookie = (res: Response) => {
  if (!COOKIE_NAME) {
    throw new Error('COOKIE_NAME is not defined in environment variables');
  }

  res.clearCookie(COOKIE_NAME, createAuthCookieOptions());
};
