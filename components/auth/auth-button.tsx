'use client';

import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';

interface AuthButtonProps {
  children: React.ReactNode;
}

export function AuthButton({ children }: AuthButtonProps) {
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
    <Button onClick={handleSignIn} variant="default">
      {children}
    </Button>
  );
}
