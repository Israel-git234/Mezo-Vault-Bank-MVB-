"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BalanceCardProps {
  title: string;
  amount: string;
  currency: string;
  icon?: ReactNode;
  variant?: "default" | "bitcoin" | "musd";
  className?: string;
}

export default function BalanceCard({ title, amount, currency, icon, variant = "default", className }: BalanceCardProps) {
  const variantStyles: Record<string, string> = {
    default: "glass-card",
    bitcoin: "glass-card glow-orange",
    musd: "glass-card glow-purple",
  };

  return (
    <div
      className={cn(
        "p-6 rounded-2xl transition-all duration-300 hover:scale-105",
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground font-medium">{title}</span>
        {icon && <div className="text-accent">{icon}</div>}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold">{amount}</span>
        <span className="text-lg text-muted-foreground">{currency}</span>
      </div>
    </div>
  );
}


