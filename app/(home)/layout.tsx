import React from "react";
import { redirect } from "next/navigation";
import Header from "./_components/common/Header";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const MainLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  const supabase = createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/");
  }
  return (
    <div
      className="w-full h-auto min-h-screen
     !bg-[#f8f8f8] dark:!bg-background"
    >
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default MainLayout;
