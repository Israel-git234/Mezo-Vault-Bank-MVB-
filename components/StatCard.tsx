"use client";

import Card from "./Card";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  change?: {
    value: number;
    positive: boolean;
  };
  className?: string;
}

export default function StatCard({ label, value, icon, change, className }: StatCardProps) {
  return (
    <Card className={cn("p-6", className)} hover>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{label}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          {change && (
            <p className={cn(
              "text-sm mt-2",
              change.positive ? "text-green-600" : "text-red-600"
            )}>
              {change.positive ? "+" : ""}{change.value}%
            </p>
          )}
        </div>
        {icon && (
          <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}

