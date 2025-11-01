"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bitcoin, LayoutGrid, Banknote, LineChart, Zap, User } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/borrow", label: "Borrow", icon: Banknote },
  { href: "/vaults", label: "Vaults", icon: LineChart },
  { href: "/spend", label: "Spend", icon: Zap },
  { href: "/profile", label: "Profile", icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:flex-col w-64 h-screen sticky top-0 border-r border-[var(--lux-border)] bg-white/5 backdrop-blur-md">
      <div className="h-16 flex items-center gap-3 px-5 border-b border-gray-200 dark:border-gray-800">
        <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
          <Bitcoin className="w-6 h-6 text-white" />
        </div>
        <div>
          <div className="font-bold">MezoBank</div>
          <div className="text-xs text-gray-500">Vaults</div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-white/5 ${
                active
                  ? "bg-white/10 text-[var(--lux-gold)]"
                  : "text-[var(--lux-text)]"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-[var(--lux-border)]">
        <div className="text-xs text-[var(--lux-text)]/60">Built on Mezo</div>
      </div>
    </aside>
  );
}
