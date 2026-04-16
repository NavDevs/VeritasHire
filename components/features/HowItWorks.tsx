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
    <div className="relative grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-3 md:gap-12">
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
          <div className="bg-secondary text-secondary-foreground font-heading shadow-float absolute -left-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full text-base font-bold sm:-left-4 sm:-top-4 sm:h-12 sm:w-12 sm:text-lg">
            {index + 1}
          </div>

          {/* Icon Container */}
          <div className="bg-primary/10 hover:bg-primary group mb-4 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 sm:mb-6 sm:h-20 sm:w-20">
            <step.icon
              size={28}
              className="text-primary transition-colors duration-300 group-hover:text-white sm:h-8 sm:w-8"
            />
          </div>

          {/* Content */}
          <h3 className="font-heading mb-2 text-lg font-bold sm:mb-3 sm:text-xl">{step.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
            {step.description}
          </p>
        </motion.div>
      ))}

      {/* Curved SVG Connector */}
      <svg
        className="pointer-events-none absolute left-0 top-10 hidden h-20 w-full md:block"
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
