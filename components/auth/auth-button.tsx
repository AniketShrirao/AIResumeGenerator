'use client';

import { Button, ButtonProps } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';

interface AuthButtonProps extends Omit<ButtonProps, 'onClick'> {
  children: React.ReactNode;
}

export function AuthButton({ children, ...props }: AuthButtonProps) {
  const supabase = createClient();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
  };

  return (
    <Button onClick={handleSignIn} {...props}>
      {children}
    </Button>
  );
}
