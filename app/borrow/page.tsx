import Header from "@/components/Header";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { Calculator, TrendingDown, Shield } from "lucide-react";
import { formatBTC, formatMUSD } from "@/lib/utils";

export default function BorrowPage() {
  const loanStats = {
    currentRate: 3.5,
    maxBorrow: 10000,
    collateralRatio: 150,
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 gradient-text">Borrow MUSD</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Use your Bitcoin as collateral to borrow MUSD at fixed rates. Keep your BTC upside while accessing liquidity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Borrow Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Collateral</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Deposit Bitcoin as collateral. Required: 150% collateralization ratio.
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Amount (BTC)</label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="0.0"
                      step="0.00000001"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                    >
                      MAX
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Available: 0.0 BTC</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">BTC Price</p>
                    <p className="text-lg font-semibold">$67,500</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Collateral Value</p>
                    <p className="text-lg font-semibold">$0.00</p>
                  </div>
                </div>

                <Button className="w-full" size="lg" isLoading={false}>
                  <Shield className="w-5 h-5 mr-2" />
                  Deposit Collateral
                </Button>
              </div>
            </Card>

            <Card>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Borrow</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Borrow against your collateral. Current rate: {loanStats.currentRate}% APR fixed.
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Amount (MUSD)</label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="0.0"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                    >
                      MAX
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Max borrow: {formatMUSD(loanStats.maxBorrow)}</p>
                </div>

                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Current Collateral Ratio</span>
                    <span className="text-sm font-semibold">N/A</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Required Ratio</span>
                    <span className="text-sm font-semibold">{loanStats.collateralRatio}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">After Borrow</span>
                    <span className="text-sm font-semibold">N/A</span>
                  </div>
                </div>

                <Button className="w-full" size="lg" variant="secondary">
                  <TrendingDown className="w-5 h-5 mr-2" />
                  Borrow MUSD
                </Button>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <h3 className="text-lg font-bold mb-4">Your Position</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Collateral</p>
                  <p className="text-xl font-bold">{formatBTC(0)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Borrowed</p>
                  <p className="text-xl font-bold">{formatMUSD(0)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Collateral Ratio</p>
                  <p className="text-xl font-bold">--</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Interest Rate</p>
                  <p className="text-xl font-bold">{loanStats.currentRate}% APR</p>
                </div>
              </div>
            </Card>

            <Card gradient>
              <h3 className="text-lg font-bold mb-3 text-white">Why Borrow?</h3>
              <ul className="space-y-2 text-sm text-white/90">
                <li>✓ Keep Bitcoin upside</li>
                <li>✓ No capital gains tax</li>
                <li>✓ Fixed interest rates</li>
                <li>✓ No liquidations below 125%</li>
                <li>✓ Use MUSD to earn yield</li>
              </ul>
            </Card>

            <Card>
              <div className="flex items-start gap-3">
                <Calculator className="w-6 h-6 text-indigo-600" />
                <div>
                  <h4 className="font-semibold mb-1">Loan Calculator</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Estimate your borrowing capacity and monthly payments.
                  </p>
                  <Button variant="ghost" size="sm" className="mt-2">
                    Open Calculator
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

