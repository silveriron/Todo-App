import { CookieOptions } from 'express';

export const access_token_options: CookieOptions = {
  httpOnly: true,
  maxAge: 1000 * 60 * 30,
  sameSite: 'none',
  secure: true,
  domain: '.todo-app.shop',
};

export const refresh_token_options: CookieOptions = {
  httpOnly: true,
  maxAge: 1000 * 60 * 60 * 24 * 7,
  sameSite: 'none',
  secure: true,
  domain: '.todo-app.shop',
};
