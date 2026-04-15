"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "muted" | "accent" | "primary" | "secondary";
  maxWidth?: "7xl" | "6xl" | "5xl" | "4xl" | "3xl";
  id?: string;
}

const variants = {
  default: "bg-background",
  muted: "bg-muted/30",
  accent: "bg-accent/30",
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
};

const maxWidths = {
  "7xl": "max-w-7xl",
  "6xl": "max-w-6xl",
  "5xl": "max-w-5xl",
  "4xl": "max-w-4xl",
  "3xl": "max-w-3xl",
};

export function Section({
  children,
  className,
  variant = "default",
  maxWidth = "7xl",
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden",
        variants[variant],
        className
      )}
    >
      <div className={cn("mx-auto", maxWidths[maxWidth])}>
        {children}
      </div>
    </section>
  );
}
