'use client';

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

const NavBar = () => {
  const supabase = createClient();
  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="shadow-sm w-full sticky top-0 bg-white dark:bg-gray-900 z-[9999]">
      <div className="w-full mx-auto max-w-7xl p-3 px-5 flex items-center justify-between">
        <div className="flex items-center flex-1 gap-9">
          <div>
            <Link href="/" className="font-black text-lg text-primary hover:opacity-90">CVbuild.ai</Link>
          </div>

          <div className="hidden lg:flex">
            <ul className="flex items-center gap-5 text-[14px] font-medium text-black dark:text-white">
              <li>
                <Link href="/features" className="hover:text-primary transition-colors">AI Features</Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-primary transition-colors">Resources</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleSignIn}>Sign In</Button>
          <Button onClick={handleSignIn}>Get Started</Button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
