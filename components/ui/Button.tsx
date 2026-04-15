"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "default",
  children,
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-bold transition-all duration-300 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95";

  const variants = {
    primary:
      "bg-primary text-primary-foreground shadow-[0_4px_20px_-2px_rgba(93,112,82,0.15)] hover:scale-105 hover:shadow-[0_6px_24px_-4px_rgba(93,112,82,0.25)]",
    outline:
      "border-2 border-secondary text-secondary bg-transparent hover:bg-secondary/10 hover:scale-105",
    ghost:
      "text-primary bg-transparent hover:bg-primary/10 hover:scale-105",
  };

  const sizes = {
    sm: "h-10 px-6 text-sm",
    default: "h-12 px-8 text-base",
    lg: "h-14 px-10 text-lg",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
