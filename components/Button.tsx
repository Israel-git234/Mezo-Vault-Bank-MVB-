"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "hero" | "glass" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  children: ReactNode;
}

export default function Button({
  variant = "default",
  size = "md",
  isLoading = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants: Record<string, string> = {
    default:
      "bg-[hsl(var(--primary))] text-white hover:brightness-110 focus:ring-[hsl(var(--secondary))] shadow-md glow-red",
    outline:
      "bg-transparent border border-[hsl(0_0%_100%_/0.14)] text-[hsl(var(--foreground))] hover:bg-white/5 focus:ring-[hsl(var(--secondary))]",
    hero:
      "bg-[linear-gradient(135deg,hsl(var(--primary))_0%,hsl(var(--secondary))_100%)] text-[hsl(var(--background))] hover:opacity-95 focus:ring-[hsl(var(--secondary))] shadow-lg glow-red",
    glass:
      "bg-[hsl(var(--card)/0.35)] backdrop-blur-xl border border-[hsl(0_0%_100%_/0.08)] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--card)/0.5)] focus:ring-[hsl(var(--secondary))] shadow-sm",
    // Backward-compat aliases
    secondary:
      "bg-[hsl(var(--card))] text-[hsl(var(--foreground))] border border-[hsl(0_0%_100%_/0.08)] hover:bg-[hsl(var(--card-2))] focus:ring-[hsl(var(--secondary))]",
    ghost: "text-[hsl(var(--secondary))] hover:bg-white/5 focus:ring-[hsl(var(--secondary))]",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-base",
    lg: "h-14 px-8 text-lg",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="mr-2 h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
}



