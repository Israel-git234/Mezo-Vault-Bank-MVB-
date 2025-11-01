"use client";

import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TxBannerProps {
  state: "idle" | "pending" | "success" | "error";
  successText?: string;
  pendingText?: string;
  errorText?: string;
  className?: string;
}

export default function TxBanner({
  state,
  successText = "Transaction confirmed",
  pendingText = "Confirm in your wallet...",
  errorText = "Transaction failed",
  className,
}: TxBannerProps) {
  if (state === "idle") return null;

  const isPending = state === "pending";
  const isSuccess = state === "success";
  const isError = state === "error";

  return (
    <div
      className={cn(
        "mt-3 rounded-xl border p-3 flex items-center gap-3",
        "border-[var(--lux-border)] bg-white/5",
        className
      )}
      role="status"
    >
      {isPending && <Loader2 className="w-4 h-4 animate-spin text-[var(--lux-gold)]" />}
      {isSuccess && <CheckCircle2 className="w-4 h-4 text-green-500" />}
      {isError && <AlertCircle className="w-4 h-4 text-red-500" />}
      <span className="text-sm">
        {isPending ? pendingText : isSuccess ? successText : errorText}
      </span>
    </div>
  );
}






