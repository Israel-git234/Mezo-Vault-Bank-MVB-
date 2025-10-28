"use client";

import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import StatCard from "@/components/StatCard";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { 
  Wallet, 
  TrendingUp, 
  DollarSign, 
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Award
} from "lucide-react";
import { formatBTC, formatMUSD, AIFormatter } from "@/lib/utils";

export default function DashboardPage() {
  const { isConnected, address } = useAccount();
  const router = useRouter();

  // Redirect to welcome if not connected
  if (!isConnected) {
    router.push("/welcome");
    return null;
  }

  // Mock user data - will be replaced with actual contract data
  const userData = {
    btcBalance: 0.05,
    musdBalance: 0,
    collateralLocked: 0,
    borrowed: 0,
    creditAvailable: 0,
    credoScore: 0,
  };

  const quickActions = [
    { name: "Deposit BTC", href: "/borrow", color: "bg-indigo-600", icon: ArrowDownRight },
    { name: "Borrow MUSD", href: "/borrow", color: "bg-purple-600", icon: DollarSign },
    { name: "Earn Yield", href: "/vaults", color: "bg-orange-600", icon: TrendingUp },
    { name: "Send Payment", href: "/spend", color: "bg-green-600", icon: ArrowUpRight },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Banner */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back! 👋</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here's your account overview
          </p>
        </div>

        {/* Account Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">BTC Balance</p>
                <p className="text-2xl font-bold">{formatBTC(userData.btcBalance)}</p>
                <p className="text-sm text-gray-500 mt-1">${(userData.btcBalance * 67500).toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Borrowed</p>
                <p className="text-2xl font-bold">{formatMUSD(userData.borrowed)}</p>
                <p className="text-sm text-green-600 mt-1">3.5% Fixed APR</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Credit Available</p>
                <p className="text-2xl font-bold">{formatMUSD(userData.creditAvailable)}</p>
                <p className="text-sm text-blue-600 mt-1">Ready to use</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Credo Score</p>
                <p className="text-2xl font-bold">{userData.credoScore || "--"}</p>
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
                <div className={`w-14 h-14 ${action.color} rounded-2xl mx-auto mb-3 flex items-center justify-center`}>
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
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Recent Activity</h3>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            
            <div className="text-center py-12">
              <Clock className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 mb-4">No recent activity</p>
              <Button variant="outline" size="sm" onClick={() => router.push("/borrow")}>
                Make Your First Deposit
              </Button>
            </div>
          </Card>

          {/* Market Stats */}
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-6">Market Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">BTC Price</span>
                <span className="font-bold text-lg">$67,500</span>
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

        {/* Getting Started Card (if no activity) */}
        {userData.collateralLocked === 0 && (
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
  );
}

