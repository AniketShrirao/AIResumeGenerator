'use client';

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/nav-bar";
import { createClient } from "@/lib/supabase/client";

const LandingLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.replace("/dashboard");
      }
    };
    
    checkSession();
  }, [router, supabase.auth]);

  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};

export default LandingLayout;
