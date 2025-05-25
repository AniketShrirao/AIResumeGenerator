import { AuthButton } from "@/components/auth/auth-button";
import { Button } from "@/components/ui/button";

import { ChevronRight, Video } from "lucide-react";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Resume Builder - Create Professional Resumes",
  description: "Build professional resumes with our AI-powered resume builder. Create, customize, and share your resume with a shareable link."
};

export default function Home() {
  return (
    <div className="w-full">
      <div className="hero-section w-full min-h-screen">
        <div className="w-full flex flex-col items-center justify-center py-10 max-w-4xl mx-auto">

          <div className="flex flex-col mt-5 items-center text-center">
            <h1 className="text-6xl font-black">
              <p>Get dream jobs with our</p>
              <p>
                <span className="bg-gradient-to-r from-primary via-purple-300 to-primary bg-clip-text text-transparent animate-sparkle">
                  AI Powered
                </span>
                {"  "}
                resume builder
              </p>
            </h1>
            <p className=" block text-xl mt-3 font-medium text-black/70">
              Build a professional,resume with our free builder, and share it
              with, shareable link.
            </p>
            <br />
            <div className="flex items-center gap-2">
              <AuthButton className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-12 px-4 py-2 min-w-32">
                Get Started
              </AuthButton>
              <a href="#" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-12 px-4 py-2 min-w-32 text-primary">
                <Video size="17px" />
                Watch video
              </a>
            </div>
          </div>
        </div>
        <div className="w-full relative max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-full h-[400px] bg-gradient-to-r from-primary to-blue-500 rounded-full blur-3xl opacity-40 z-0" />
          <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-xl shadow-lg bg-background">
            <div className="relative w-full h-full rounded-md">
              <Image
                src="/images/board-img.png"
                alt="App dashboard"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain w-full h-full rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}
