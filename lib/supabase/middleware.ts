import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { createMiddleware } from 'hono/factory';
import { HTTPException } from 'hono/http-exception';
import { cookies } from 'next/headers';

type Env = {
  Variables: {
    user: any; // Replace with your user type
  };
};

export const getAuthUser = createMiddleware<Env>(async (c, next) => {
  try {
    const cookieStore = cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.set({ name, value: '', ...options });
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new HTTPException(401, {
        res: c.json({ error: 'unauthorized' }),
      });
    }

    c.set('user', user);
    await next();
  } catch (error) {
    console.error(error);
    throw new HTTPException(401, {
      res: c.json({ error: 'unauthorized' }),
    });
  }
});