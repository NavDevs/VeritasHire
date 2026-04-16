"use client";

import { motion } from "framer-motion";
import { FileText, Search, AlertTriangle } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Paste Job Posting",
    description: "Copy the job description text and paste it into our analyzer",
  },
  {
    icon: Search,
    title: "AI Analysis",
    description: "Our machine learning model examines patterns and red flags",
  },
  {
    icon: AlertTriangle,
    title: "Get Results",
    description: "Receive instant feedback on whether the job is legitimate",
  },
];

export function HowItWorks() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 relative">
      {steps.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className="relative"
        >
          {/* Step Number */}
          <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-secondary text-secondary-foreground font-heading font-bold text-base sm:text-lg flex items-center justify-center shadow-float">
            {index + 1}
          </div>

          {/* Icon Container */}
          <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-6 transition-all duration-300 hover:bg-primary group">
            <step.icon
              size={28}
              className="sm:w-8 sm:h-8 text-primary transition-colors duration-300 group-hover:text-white"
            />
          </div>

          {/* Content */}
          <h3 className="text-lg sm:text-xl font-heading font-bold mb-2 sm:mb-3">{step.title}</h3>
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
            {step.description}
          </p>
        </motion.div>
      ))}

      {/* Curved SVG Connector */}
      <svg
        className="absolute top-10 left-0 w-full h-20 hidden md:block pointer-events-none"
        viewBox="0 0 800 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M 100 40 Q 200 10, 267 40 T 400 40 Q 500 10, 533 40 T 667 40"
          stroke="var(--color-primary)"
          strokeWidth="3"
          strokeDasharray="8 8"
          strokeLinecap="round"
          opacity="0.3"
        />
      </svg>
    </div>
  );
}
