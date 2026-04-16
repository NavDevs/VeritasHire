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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
      {features.map((feature, index) => (
        <div
          key={index}
          className="group space-y-3 sm:space-y-4 p-4 sm:p-6 rounded-[2rem] hover:bg-white/50 transition-all duration-300"
        >
          <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:bg-primary">
            <feature.icon
              size={24}
              className="sm:w-7 sm:h-7 text-primary transition-colors duration-300 group-hover:text-white"
            />
          </div>
          <h3 className="text-base sm:text-lg font-heading font-bold">{feature.title}</h3>
          <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
}
