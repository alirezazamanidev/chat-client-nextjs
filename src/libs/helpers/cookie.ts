'use server'
import { cookies } from 'next/headers';

export const SetCookie = async (key: string, value: string) => {
  const cookieStore = await cookies();

  cookieStore.set(key, value, {
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
};

export const RemoveCookie = async (key: string) => {
  const cookieStore = await cookies();
  return cookieStore.delete(key);
};
