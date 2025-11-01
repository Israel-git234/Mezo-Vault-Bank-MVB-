"use client";

import { useAccount, useWatchContractEvent } from "wagmi";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import BalanceCard from "@/components/BalanceCard";
import TransactionHistory from "@/components/TransactionHistory";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Sidebar from "@/components/Sidebar";
import { 
  Wallet, 
  TrendingUp, 
  DollarSign, 
  ArrowUpRight,
  ArrowDownRight,
  Award
} from "lucide-react";
import { formatMUSD } from "@/lib/utils";
import { useGetPosition, useGetCollateralRatio, formatBTCPrice, VaultManagerABI, VAULT_MANAGER_ADDRESS, satoshisToBTC } from "@/lib/contracts";
import type { Address } from "viem";

export default function DashboardPage() {
  const { isConnected, address } = useAccount();
  const router = useRouter();
  const [btcPrice, setBtcPrice] = useState<number>(67500);
  const priceBig = useMemo(() => formatBTCPrice(btcPrice), [btcPrice]);

  const { position } = useGetPosition(address as Address | undefined);
  const { ratio } = useGetCollateralRatio(address as Address | undefined, priceBig);

  // Derive user data from on-chain position
  const collateralBtc = position ? Number((position as any).collateral) / 1e8 : 0;
  const borrowedUsd = position ? Number((position as any).borrowed) / 100 : 0;
  const interestUsd = position ? Number((position as any).interestOwed) / 100 : 0;
  const totalDebtUsd = borrowedUsd + interestUsd;

  // Estimate credit available using 150% min collateral ratio
  const MIN_COLLATERAL_RATIO = 150;
  const collateralUsd = collateralBtc * btcPrice;
  const maxBorrowableUsd = collateralUsd * (100 / MIN_COLLATERAL_RATIO);
  const creditAvailableUsd = Math.max(0, maxBorrowableUsd - totalDebtUsd);

  useEffect(() => {
    // Redirect to welcome when disconnected
    if (!isConnected) {
      router.push("/welcome");
    }
  }, [isConnected, router]);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd");
        const data = await res.json();
        if (data?.bitcoin?.usd) setBtcPrice(Number(data.bitcoin.usd));
      } catch {}
    };
    fetchPrice();
  }, []);

  // Live activity via events
  useWatchContractEvent({
    address: VAULT_MANAGER_ADDRESS,
    abi: VaultManagerABI as any,
    eventName: "CollateralDeposited",
    onLogs() {},
  });
  useWatchContractEvent({
    address: VAULT_MANAGER_ADDRESS,
    abi: VaultManagerABI as any,
    eventName: "CollateralWithdrawn",
    onLogs() {},
  });
  useWatchContractEvent({
    address: VAULT_MANAGER_ADDRESS,
    abi: VaultManagerABI as any,
    eventName: "MUSDBorrowed",
    onLogs() {},
  });
  useWatchContractEvent({
    address: VAULT_MANAGER_ADDRESS,
    abi: VaultManagerABI as any,
    eventName: "LoanRepaid",
    onLogs() {},
  });

  const quickActions = [
    { name: "Deposit BTC", href: "/borrow", color: "bg-indigo-600", icon: ArrowDownRight },
    { name: "Borrow MUSD", href: "/borrow", color: "bg-purple-600", icon: DollarSign },
    { name: "Earn Yield", href: "/vaults", color: "bg-orange-600", icon: TrendingUp },
    { name: "Send Payment", href: "/spend", color: "bg-green-600", icon: ArrowUpRight },
  ];

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Banner */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back! 👋</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here&apos;s your account overview
          </p>
        </div>

        {/* Account Overview Cards (Lovable style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <BalanceCard
            title="BTC Balance"
            amount={`${collateralBtc.toLocaleString('en-US', { maximumFractionDigits: 8 })}`}
            currency="BTC"
            icon={<Wallet className="h-5 w-5" />}
            variant="bitcoin"
          />
          <BalanceCard
            title="Borrowed"
            amount={`${totalDebtUsd.toLocaleString('en-US', { maximumFractionDigits: 2 })}`}
            currency="MUSD"
            icon={<DollarSign className="h-5 w-5" />}
            variant="musd"
          />
          <BalanceCard
            title="Credit Available"
            amount={`${creditAvailableUsd.toLocaleString('en-US', { maximumFractionDigits: 2 })}`}
            currency="MUSD"
            icon={<TrendingUp className="h-5 w-5" />}
          />
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Credo Score</p>
                <p className="text-2xl font-bold">{ratio ? Number(ratio) : "--"}%</p>
                <p className="text-sm text-gray-500 mt-1">Build your credit</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Card 
                key={action.name}
                hover
                className="p-6 text-center cursor-pointer"
                onClick={() => router.push(action.href)}
              >
                <div className={`w-14 h-14 ${action.color} rounded-2xl mx-auto mb-3 flex items-center justify-center glow-red`}>
                  <action.icon className="w-7 h-7 text-white" />
                </div>
                <p className="font-semibold text-sm">{action.name}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity & Market Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <TransactionHistory />

          {/* Market Stats */}
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-6">Market Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">BTC Price</span>
                <span className="font-bold text-lg">${btcPrice.toLocaleString('en-US')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Platform TVL</span>
                <span className="font-bold text-lg">$2.5M</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Avg Vault APY</span>
                <span className="font-bold text-lg text-green-600">12.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Active Users</span>
                <span className="font-bold text-lg">1,842</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Getting Started Card (if no collateral and no debt) */}
        {(collateralBtc === 0 && totalDebtUsd === 0) && (
          <Card gradient className="p-8 mt-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Get Started with MezoBank</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Deposit Bitcoin as collateral to start borrowing MUSD, earning yield, and building your Credo Score
            </p>
            <Button 
              variant="secondary" 
              size="lg"
              className="bg-white text-indigo-600 hover:bg-gray-100"
              onClick={() => router.push("/borrow")}
            >
              Deposit BTC Now
              <ArrowUpRight className="w-5 h-5 ml-2" />
            </Button>
          </Card>
        )}
        </main>
      </div>
    </div>
  );
}

