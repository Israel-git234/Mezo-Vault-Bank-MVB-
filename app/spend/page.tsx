"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { Zap, Bolt, ShoppingCart, Send, QrCode } from "lucide-react";
import { formatMUSD, formatBTC } from "@/lib/utils";
import { getAppState, applySpend } from "@/lib/state";
import { useState } from "react";
import { useToast } from "@/components/Toast";
import { appendHistory } from "@/lib/history";

export default function SpendPage() {
  const { toast } = useToast();
  const [invoice, setInvoice] = useState("");
  const [amount, setAmount] = useState<string>("");
  const state = getAppState();

  const available = state.musdAvailable;

  const handlePay = async () => {
    const usd = parseFloat(amount || "0");
    if (!invoice || !usd || usd <= 0) {
      toast({ title: "Enter invoice and amount", variant: "info" });
      return;
    }
    if (usd > available) {
      toast({ title: "Insufficient spendable balance", variant: "error" });
      return;
    }
    // Simulate payment
    applySpend(usd);
    appendHistory({ type: "spend", amount: usd });
    toast({ title: "Payment sent!", description: "MUSD → BTC lightning payment", variant: "success" });
    setInvoice("");
    setAmount("");
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
              <Bolt className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold gradient-text">Houdini Spend</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Lightning Network Integration</p>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Pay any Lightning invoice instantly using your MUSD credit line. Converts to BTC atomically at payment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Spending Interface */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Available Credit</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Use your borrowed MUSD to pay Lightning invoices worldwide.
                </p>
              </div>

              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white mb-6">
                <p className="text-sm opacity-90 mb-2">Available to Spend</p>
                <p className="text-4xl font-bold">{formatMUSD(available)}</p>
                <p className="text-sm opacity-75 mt-2">
                  {formatBTC(available / 67500)} BTC equivalent
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Lightning Invoice</label>
                  <div className="relative">
                    <textarea
                      placeholder="lnbc..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={invoice}
                      onChange={(e) => setInvoice(e.target.value)}
                    />
                    <button className="absolute top-3 right-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                      <QrCode className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Invoice Amount</span>
                    <span className="text-sm font-semibold">{amount ? `$${Number(amount).toLocaleString('en-US', { maximumFractionDigits: 2 })}` : "--"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">MUSD to Pay</span>
                    <span className="text-sm font-semibold">{amount || "--"}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-indigo-200 dark:border-indigo-800">
                    <span className="text-sm font-medium">Transaction Fee</span>
                    <span className="text-sm font-semibold text-green-600">~$0.01</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    placeholder="Amount (MUSD)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <Button className="flex-1" size="lg" onClick={handlePay}>
                  <Send className="w-5 h-5 mr-2" />
                  Pay Lightning Invoice
                  </Button>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-xl font-bold mb-4">Recent Transactions</h3>
              <div className="text-gray-400 text-sm">See dashboard for full history.</div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card gradient>
              <h3 className="text-lg font-bold mb-3 text-white">How It Works</h3>
              <ol className="space-y-3 text-sm text-white/90">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-bold">1</span>
                  <span>Paste Lightning invoice or scan QR code</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-bold">2</span>
                  <span>MUSD converts to BTC atomically</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-bold">3</span>
                  <span>Payment processes via Lightning Network</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-bold">4</span>
                  <span>Done! No need to sell your Bitcoin</span>
                </li>
              </ol>
            </Card>

            <Card>
              <h3 className="text-lg font-bold mb-4">Spending Stats</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Spent</p>
                  <p className="text-2xl font-bold">{formatMUSD(0)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Lightning Status</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full bg-green-500`}></div>
                    <span className="font-medium">
                      Active
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Transactions</p>
                  <p className="text-xl font-bold">—</p>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-bold mb-3">Use Cases</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <ShoppingCart className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">E-commerce</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Buy online instantly</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <Zap className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Subscriptions</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Streaming, SaaS, etc.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <Send className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Remittances</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Send money globally</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        </main>
      </div>
    </div>
  );
}

