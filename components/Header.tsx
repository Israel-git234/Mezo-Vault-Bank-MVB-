"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Button from "./Button";
import { Wallet, Menu, X, Bitcoin } from "lucide-react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "@wagmi/connectors";
import { truncateAddress } from "@/lib/utils";

export default function Header() {
	const { address, isConnected } = useAccount();
	const { connect, isPending: isConnecting } = useConnect();
	const { disconnect } = useDisconnect();
	const pathname = usePathname();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const handleConnect = () => {
		connect({ connector: injected() });
	};

	const navLinks = [
		{ href: "/dashboard", label: "Dashboard" },
		{ href: "/borrow", label: "Borrow" },
		{ href: "/vaults", label: "Vaults" },
		{ href: "/spend", label: "Spend" },
	];

	const isActive = (href: string) => pathname === href;

	return (
		<header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
			<div className="container mx-auto px-4 h-16 flex items-center justify-between">
				{/* Logo */}
				<Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
					<div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
						<Bitcoin className="w-6 h-6 text-white" />
					</div>
					<div className="hidden sm:block">
						<h1 className="text-xl font-bold gradient-text">MezoBank Vaults</h1>
						<p className="text-xs text-gray-500 dark:text-gray-400">Powered by Mezo</p>
					</div>
				</Link>

				{/* Navigation - Desktop */}
				<nav className="hidden md:flex items-center space-x-6">
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
								isActive(link.href)
									? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
									: "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
							}`}
						>
							{link.label}
						</Link>
					))}
				</nav>

				{/* Actions */}
				<div className="flex items-center space-x-3">
					{isConnected ? (
						<Button variant="outline" size="sm" onClick={() => disconnect()}>
							<Wallet className="w-4 h-4 mr-2" />
							<span className="hidden sm:inline">{truncateAddress(address!)}</span>
						</Button>
					) : (
						<Button size="sm" onClick={handleConnect} isLoading={isConnecting}>
							<Wallet className="w-4 h-4 mr-2" />
							<span className="hidden sm:inline">Connect Wallet</span>
							<span className="sm:hidden">Connect</span>
						</Button>
					)}
					<button 
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
					>
						{mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
					</button>
				</div>
			</div>

			{/* Mobile Menu */}
			{mobileMenuOpen && (
				<div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 animate-fade-in">
					<nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								onClick={() => setMobileMenuOpen(false)}
								className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
									isActive(link.href)
										? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
										: "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
								}`}
							>
								{link.label}
							</Link>
						))}
					</nav>
				</div>
			)}
		</header>
	);
}


