"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  asymmetric?: boolean;
  shapeIndex?: number;
}

// Different organic border radius patterns
const asymmetricShapes = [
  "rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-[2rem] rounded-bl-[2rem]",
  "rounded-tl-[2rem] rounded-br-[3rem] rounded-tr-[4rem] rounded-bl-[2rem]",
  "rounded-tl-[3rem] rounded-br-[2rem] rounded-tr-[2rem] rounded-bl-[4rem]",
  "rounded-tl-[2rem] rounded-br-[4rem] rounded-tr-[3rem] rounded-bl-[2rem]",
  "rounded-tl-[4rem] rounded-br-[2rem] rounded-tr-[2rem] rounded-bl-[3rem]",
  "rounded-tl-[2rem] rounded-br-[2rem] rounded-tr-[4rem] rounded-bl-[3rem]",
];

export function Card({
  children,
  asymmetric = false,
  shapeIndex = 0,
  className,
  ...props
}: CardProps) {
  const baseStyles =
    "bg-card border border-border/50 shadow-[0_4px_20px_-2px_rgba(93,112,82,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(93,112,82,0.15)]";

  const shapeStyles = asymmetric
    ? asymmetricShapes[shapeIndex % asymmetricShapes.length]
    : "rounded-[2rem]";

  return (
    <div
      className={cn(baseStyles, shapeStyles, className)}
      {...props}
    >
      {children}
    </div>
  );
}
