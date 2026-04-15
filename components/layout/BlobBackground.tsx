"use client";

import { cn } from "@/lib/utils";

interface BlobBackgroundProps {
  className?: string;
  color?: "moss" | "terracotta" | "sand";
  size?: "sm" | "md" | "lg";
  shapeIndex?: number;
}

const colors = {
  moss: "bg-primary/20",
  terracotta: "bg-secondary/20",
  sand: "bg-accent/40",
};

const sizes = {
  sm: "w-64 h-64",
  md: "w-96 h-96",
  lg: "w-[32rem] h-[32rem]",
};

const shapes = [
  "blob-shape",
  "blob-shape-2",
  "blob-shape-3",
];

export function BlobBackground({
  className,
  color = "moss",
  size = "lg",
  shapeIndex = 0,
}: BlobBackgroundProps) {
  return (
    <div
      className={cn(
        "absolute blur-3xl pointer-events-none",
        colors[color],
        sizes[size],
        shapes[shapeIndex % shapes.length],
        className
      )}
      aria-hidden="true"
    />
  );
}
