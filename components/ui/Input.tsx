"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && <label className="text-foreground mb-2 block text-sm font-semibold">{label}</label>}
      <input
        className={cn(
          "border-border h-12 w-full rounded-full border bg-white/50 px-6",
          "text-foreground placeholder:text-muted-foreground text-sm",
          "focus-visible:ring-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "transition-all duration-300",
          error && "border-destructive focus-visible:ring-destructive/30",
          className
        )}
        {...props}
      />
      {error && <p className="text-destructive mt-2 text-sm">{error}</p>}
    </div>
  );
}
