import React from "react";
import { redirect } from "next/navigation";
import NavBar from "@/components/nav-bar";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const LandingLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const supabase = createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    redirect("/dashboard");
  }
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};

export default LandingLayout;
