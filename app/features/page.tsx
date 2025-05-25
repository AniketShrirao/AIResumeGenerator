import { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Sparkles, Brain, Share2, Clock, Sparkle, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Features - CVbuild.ai",
  description: "Explore the powerful AI features that make CVbuild.ai the smartest resume builder."
};

const features = [
  {
    title: "AI-Powered Content Generation",
    description: "Let our advanced AI help you write compelling resume content tailored to your industry and experience level.",
    icon: Sparkles
  },
  {
    title: "Smart Formatting",
    description: "Automatically format your resume with industry-standard layouts and professional designs.",
    icon: Sparkle
  },
  {
    title: "Real-time Analysis",
    description: "Get instant feedback on your resume's content, structure, and impact with our AI analysis tools.",
    icon: Brain
  },
  {
    title: "Quick Generation",
    description: "Create a professional resume in minutes, not hours, with our streamlined AI-assisted process.",
    icon: Clock
  },
  {
    title: "Easy Sharing",
    description: "Share your resume with a unique link or export it in multiple formats for different platforms.",
    icon: Share2
  },
  {
    title: "ATS Optimization",
    description: "Ensure your resume passes Applicant Tracking Systems with our AI-powered optimization tools.",
    icon: FileText
  }
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Powerful AI Features</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Create stunning resumes with our cutting-edge AI technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow dark:bg-gray-800">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg mr-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}