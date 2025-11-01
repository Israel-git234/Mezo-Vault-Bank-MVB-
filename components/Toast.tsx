"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ToastVariant = "default" | "success" | "error" | "info";

export interface ToastItem {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  durationMs?: number;
}

interface ToastContextValue {
  toast: (item: Omit<ToastItem, "id">) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const timers = useRef<Record<string, number>>({});

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
      delete timers.current[id];
    }
  }, []);

  const toast = useCallback((item: Omit<ToastItem, "id">) => {
    const id = Math.random().toString(36).slice(2);
    const duration = item.durationMs ?? 3000;
    const toAdd: ToastItem = { id, ...item };
    setItems((prev) => [toAdd, ...prev].slice(0, 5));
    timers.current[id] = window.setTimeout(() => remove(id), duration);
  }, [remove]);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Container */}
      <div className="fixed z-[100] pointer-events-none w-full px-3 md:px-0">
        <div className="max-w-7xl mx-auto">
          <div className="md:fixed md:top-4 md:right-4 md:left-auto md:w-auto md:px-0 flex flex-col gap-2 mt-4 md:mt-0">
            {items.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "pointer-events-auto glass-card rounded-xl p-4 border animate-slide-up",
                  item.variant === "success" && "border-green-300/20",
                  item.variant === "error" && "border-red-300/20",
                  item.variant === "info" && "border-blue-300/20"
                )}
                onClick={() => remove(item.id)}
              >
                {item.title && <p className="font-semibold mb-1">{item.title}</p>}
                {item.description && <p className="text-sm text-white/80">{item.description}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToastContext.Provider>
  );
}



