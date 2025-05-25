import { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Video, Users, Newspaper, GraduationCap } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resources - CVbuild.ai",
  description: "Access guides, tutorials, and best practices for creating the perfect resume with CVbuild.ai"
};

const resources = [
  {
    title: "Getting Started Guide",
    description: "Learn the basics of creating your first resume with CVbuild.ai",
    icon: BookOpen,
    link: "/guides/getting-started",
    category: "Guide"
  },
  {
    title: "Resume Templates",
    description: "Browse our collection of professional resume templates",
    icon: FileText,
    link: "/templates",
    category: "Templates"
  },
  {
    title: "Video Tutorials",
    description: "Watch step-by-step tutorials on using advanced features",
    icon: Video,
    link: "/tutorials",
    category: "Tutorial"
  },
  {
    title: "Career Tips",
    description: "Expert advice on job searching and career development",
    icon: GraduationCap,
    link: "/career-tips",
    category: "Article"
  },
  {
    title: "Success Stories",
    description: "Read how others landed their dream jobs using CVbuild.ai",
    icon: Users,
    link: "/success-stories",
    category: "Stories"
  },
  {
    title: "Industry Updates",
    description: "Stay informed about the latest resume and hiring trends",
    icon: Newspaper,
    link: "/updates",
    category: "News"
  }
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Resources & Guides</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Everything you need to create a winning resume
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow dark:bg-gray-800">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg mr-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <span className="text-sm text-primary font-medium">{resource.category}</span>
                    <h3 className="text-xl font-semibold">{resource.title}</h3>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{resource.description}</p>
                <Link href={resource.link}>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}