import { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing - CVbuild.ai",
  description: "Choose the perfect plan for your resume building needs with CVbuild.ai"
};

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started",
    features: [
      "1 Resume Template",
      "Basic AI Suggestions",
      "PDF Export",
      "Basic Analytics",
      "Email Support"
    ]
  },
  {
    name: "Pro",
    price: "$12",
    period: "/month",
    description: "Best for professionals",
    features: [
      "All Free Features",
      "Unlimited Resume Templates",
      "Advanced AI Content Generation",
      "ATS Optimization",
      "Multiple Export Formats",
      "Priority Support"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: "$29",
    period: "/month",
    description: "For teams and businesses",
    features: [
      "All Pro Features",
      "Custom Branding",
      "Team Management",
      "API Access",
      "Advanced Analytics",
      "Dedicated Support",
      "Custom Integration"
    ]
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Choose the plan that best fits your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`p-8 relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  Popular
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{plan.description}</p>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-gray-600 dark:text-gray-400 ml-1">{plan.period}</span>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-primary mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                Get Started
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}