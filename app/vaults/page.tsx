"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { TrendingUp, Zap, Shield, ArrowLeftRight } from "lucide-react";
import { formatMUSD, AIFormatter } from "@/lib/utils";
import { getAppState, investToVault, withdrawFromVault, reinvestAccrued, toggleAutoRepay, accrueYield } from "@/lib/state";
import { useEffect, useState } from "react";
import { useToast } from "@/components/Toast";

export default function VaultsPage() {
  const { toast } = useToast();
  const [investAmount, setInvestAmount] = useState<string>("");
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");
  const state = getAppState();
  useEffect(() => { accrueYield(0.08); }, []);
  const vaults = [
    {
      id: "stable",
      name: "Stable Yield",
      type: "Stable",
      apy: 8.5,
      tvl: 1250000,
      description: "Low-risk yield focused on stability with consistent returns",
      riskLevel: "Low",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "balanced",
      name: "Balanced Growth",
      type: "Balanced",
      apy: 12.3,
      tvl: 850000,
      description: "Balanced approach between growth and stability",
      riskLevel: "Medium",
      color: "from-blue-500 to-indigo-500",
    },
    {
      id: "growth",
      name: "Growth Vault",
      type: "Growth",
      apy: 18.7,
      tvl: 425000,
      description: "Higher risk, higher reward strategy for maximum returns",
      riskLevel: "High",
      color: "from-orange-500 to-red-500",
    },
    {
      id: "auto-repay",
      name: "Auto-Repay Vault",
      type: "Smart",
      apy: 10.2,
      tvl: 672000,
      description: "Self-repaying loans - automatically covers your loan interest",
      riskLevel: "Medium",
      color: "from-purple-500 to-pink-500",
    },
  ];

  const userPositions = [
    {
      vaultId: "stable",
      vaultName: "Stable Yield",
      deposited: 0,
      currentValue: 0,
      earnings: 0,
      apy: 8.5,
    },
  ];

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 gradient-text">Smart Yield Vaults</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Deploy your MUSD into automated yield strategies. Earn passive income or auto-repay your loan interest.
          </p>
        </div>

        {/* Smart Vaults - Auto-Repay */}
        <Card className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Smart Vaults</h2>
            <div className="flex items-center gap-2">
              <label className="text-sm">Enable Auto-Repay Interest</label>
              <input
                type="checkbox"
                defaultChecked={state.autoRepayEnabled}
                onChange={(e) => { toggleAutoRepay(e.target.checked); toast({ title: e.target.checked ? "Auto-Repay Enabled" : "Auto-Repay Disabled" }); }}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Vault Balance</p>
              <p className="text-2xl font-bold">{formatMUSD(state.vaultBalance)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Accrued Yield</p>
              <p className="text-2xl font-bold text-green-600">{formatMUSD(state.vaultAccrued)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">APY</p>
              <p className="text-2xl font-bold text-green-600">8%</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="flex items-center gap-3">
              <input
                type="number"
                placeholder="Invest (MUSD)"
                value={investAmount}
                onChange={(e) => setInvestAmount(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Button onClick={() => { const v = parseFloat(investAmount||'0'); if (v>0){ investToVault(v); toast({ title: "Invested", variant: "success" }); setInvestAmount(''); } }}>Invest</Button>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                placeholder="Withdraw (MUSD)"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Button variant="outline" onClick={() => { const v = parseFloat(withdrawAmount||'0'); if (v>0){ withdrawFromVault(v); toast({ title: "Withdrawn", variant: "success" }); setWithdrawAmount(''); } }}>Withdraw</Button>
            </div>
            <div className="flex items-center">
              <Button className="w-full" variant="secondary" onClick={() => { reinvestAccrued(); toast({ title: "Yield Reinvested", variant: "success" }); }}>Reinvest Accrued</Button>
            </div>
          </div>
        </Card>

        {/* Market Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total TVL</p>
                <p className="text-2xl font-bold">{formatMUSD(3200000)}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Average APY</p>
                <p className="text-2xl font-bold">{AIFormatter(12.425)}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active Positions</p>
                <p className="text-2xl font-bold">1,247</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Vaults Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Available Vaults</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {vaults.map((vault) => (
              <Card key={vault.id} hover className="overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${vault.color}`}></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold">{vault.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          vault.riskLevel === "Low" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                          vault.riskLevel === "Medium" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                          "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        }`}>
                          {vault.riskLevel} Risk
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{vault.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">APY</p>
                      <p className="text-3xl font-bold text-green-600">{AIFormatter(vault.apy)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">TVL</p>
                      <p className="text-lg font-semibold">{formatMUSD(vault.tvl)}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1">
                      <ArrowLeftRight className="w-4 h-4 mr-2" />
                      Deposit
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Your Positions */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Your Positions</h2>
          {userPositions.length === 0 ? (
            <Card className="text-center py-12">
              <TrendingUp className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                You don&apos;t have any active positions yet.
              </p>
              <Button>Explore Vaults</Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {userPositions.map((position) => (
                <Card key={position.vaultId}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold">{position.vaultName}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Deposited: {formatMUSD(position.deposited)} • 
                        Current Value: {formatMUSD(position.currentValue)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">
                        +{formatMUSD(position.earnings)}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {AIFormatter(position.apy)} APY
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <Button variant="outline" className="flex-1">Withdraw</Button>
                    <Button variant="outline" className="flex-1">Reinvest</Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
        </main>
      </div>
    </div>
  );
}

