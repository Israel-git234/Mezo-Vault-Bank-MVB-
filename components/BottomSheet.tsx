"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function BottomSheet({ open, onClose, title, children }: BottomSheetProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [open]);

  return (
    <div className={cn(
      "fixed inset-0 z-50 transition-opacity",
      open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
    )}>
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className={cn(
        "absolute left-0 right-0 bottom-0 p-4",
        "md:left-1/2 md:-translate-x-1/2 md:bottom-6 md:w-[640px]"
      )}>
        <div className="glass-card rounded-2xl border p-4 md:p-6">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            {title && <h3 className="text-lg font-bold">{title}</h3>}
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}








