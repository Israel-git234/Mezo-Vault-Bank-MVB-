"use client";

import { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

export default function Card({ children, className, hover = false, gradient = false, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-6 shadow-sm",
        "bg-[var(--lux-surface)] border-[var(--lux-border)]",
        hover && "card-hover cursor-pointer",
        gradient && "gradient-bg text-white border-transparent",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}



