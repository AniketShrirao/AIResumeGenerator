import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

async function setCookie(name: string, value: string, options: CookieOptions) {
  'use server';
  try {
    const cookieStore = cookies();
    cookieStore.set({ name, value, ...options });
  } catch (error) {
    console.error('Error setting cookie:', error);
  }
}

async function removeCookie(name: string, options: CookieOptions) {
  'use server';
  try {
    const cookieStore = cookies();
    cookieStore.set({ name, value: '', ...options });
  } catch (error) {
    console.error('Error removing cookie:', error);
  }
}

export const createServerSupabaseClient = () => {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set: setCookie,
        remove: removeCookie,
      },
    }
  );
};