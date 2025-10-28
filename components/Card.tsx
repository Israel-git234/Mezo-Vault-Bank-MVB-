"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

export default function Card({ children, className, hover = false, gradient = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm",
        hover && "card-hover cursor-pointer",
        gradient && "gradient-bg text-white border-transparent",
        className
      )}
    >
      {children}
    </div>
  );
}



