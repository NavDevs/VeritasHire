"use client";

import { Shield, Brain, AlertCircle, CheckCircle2 } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Machine Learning Powered",
    description:
      "Advanced NLP algorithms analyze job posting patterns, language, and metadata to identify fraudulent listings.",
  },
  {
    icon: Shield,
    title: "Real-time Protection",
    description:
      "Get instant results and protect yourself from employment scams before sharing personal information.",
  },
  {
    icon: AlertCircle,
    title: "Red Flag Detection",
    description:
      "Identifies common warning signs like unrealistic salaries, vague descriptions, and suspicious contact methods.",
  },
  {
    icon: CheckCircle2,
    title: "Verified Dataset",
    description:
      "Trained on 80,000+ verified job postings with accurate labels for reliable predictions.",
  },
];

export function FeaturesGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
      {features.map((feature, index) => (
        <div
          key={index}
          className="group space-y-3 rounded-[2rem] p-4 transition-all duration-300 hover:bg-white/50 sm:space-y-4 sm:p-6"
        >
          <div className="bg-primary/10 group-hover:bg-primary flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 sm:h-14 sm:w-14">
            <feature.icon
              size={24}
              className="text-primary transition-colors duration-300 group-hover:text-white sm:h-7 sm:w-7"
            />
          </div>
          <h3 className="font-heading text-base font-bold sm:text-lg">{feature.title}</h3>
          <p className="text-muted-foreground text-xs leading-relaxed sm:text-sm">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
}
