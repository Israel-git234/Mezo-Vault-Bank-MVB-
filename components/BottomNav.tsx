"use client";

import { usePathname, useRouter } from "next/navigation";
import { Home, Wallet, ArrowUpRight, Boxes, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  const items = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Spend", href: "/spend", icon: Wallet },
    { name: "Vaults", href: "/vaults", icon: Boxes },
    { name: "Borrow", href: "/borrow", icon: ArrowUpRight },
    { name: "Profile", href: "/profile", icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-3 left-3 right-3 z-50">
      <div className={cn(
        "glass-card rounded-2xl px-2 py-2 border",
        "flex items-center justify-between"
      )}>
        {items.map(({ name, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <button
              key={href}
              onClick={() => router.push(href)}
              className={cn(
                "relative flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all",
                active ? "text-white scale-105 glow-red" : "text-white/70 hover:text-white"
              )}
            >
              <Icon className={cn("w-6 h-6 transition-transform", active && "scale-110")}/>
              <span className="text-[11px] font-medium">{name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}








