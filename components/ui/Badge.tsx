"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "destructive" | "outline";
  children: React.ReactNode;
}

export function Badge({
  variant = "default",
  children,
  className,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300";

  const variants = {
    default: "bg-muted text-muted-foreground",
    success: "bg-primary/10 text-primary",
    warning: "bg-secondary/10 text-secondary",
    destructive: "bg-destructive/10 text-destructive",
    outline: "border border-border bg-transparent text-foreground",
  };

  return (
    <span
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
}
