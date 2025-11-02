"use client";

import { X } from "lucide-react";
import Card from "./Card";

interface PitchDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PitchDeckModal({ isOpen, onClose }: PitchDeckModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <Card className="p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Problem */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4 gradient-text">The Problem</h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p className="text-lg">
                📉 <strong>Bitcoin holders face a dilemma:</strong> Sell to access liquidity, or hold and miss opportunities.
              </p>
              <p className="text-lg">
                🏦 <strong>2.5 billion people</strong> lack access to fair credit and banking services.
              </p>
              <p className="text-lg">
                💸 <strong>Traditional loans</strong> have variable rates, hidden fees, and require selling assets.
              </p>
            </div>
          </section>

          {/* Solution */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4 gradient-text">Our Solution</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <h3 className="font-bold text-lg mb-2">🏦 Borrow Against Bitcoin</h3>
                <p className="text-sm">Keep your BTC, access liquidity at 3.5% fixed APR. No capital gains taxes.</p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h3 className="font-bold text-lg mb-2">📈 Self-Repaying Loans</h3>
                <p className="text-sm">Deploy borrowed MUSD into yield vaults that automatically pay your loan interest.</p>
              </div>
              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <h3 className="font-bold text-lg mb-2">⚡ Lightning Spending</h3>
                <p className="text-sm">Spend your credit line globally via Lightning Network. Groceries, subscriptions, remittances.</p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h3 className="font-bold text-lg mb-2">🏅 Credo-ID Credit Score</h3>
                <p className="text-sm">Build portable, on-chain credit reputation that works across all Mezo dApps.</p>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4 gradient-text">How It Works</h2>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1 text-center">
                <div className="w-16 h-16 gradient-bg rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <h4 className="font-semibold mb-2">Deposit BTC</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Lock Bitcoin as collateral while keeping ownership</p>
              </div>
              <div className="text-gray-400 text-2xl">→</div>
              <div className="flex-1 text-center">
                <div className="w-16 h-16 gradient-bg rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <h4 className="font-semibold mb-2">Borrow MUSD</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Fixed 3.5% rate, predictable payments</p>
              </div>
              <div className="text-gray-400 text-2xl">→</div>
              <div className="flex-1 text-center">
                <div className="w-16 h-16 gradient-bg rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-xl">
                  3
                </div>
                <h4 className="font-semibold mb-2">Earn Yield</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Auto-repay interest with vault earnings</p>
              </div>
              <div className="text-gray-400 text-2xl">→</div>
              <div className="flex-1 text-center">
                <div className="w-16 h-16 gradient-bg rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-xl">
                  4
                </div>
                <h4 className="font-semibold mb-2">Spend</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Use Lightning for global payments</p>
              </div>
            </div>
          </section>

          {/* Impact */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4 gradient-text">Impact</h2>
            <div className="bg-gradient-to-r from-indigo-500 to-orange-500 rounded-xl p-6 text-white">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">2.5B+</div>
                  <div className="text-sm opacity-90">Potential Users (Underbanked)</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">$67T</div>
                  <div className="text-sm opacity-90">Bitcoin Market Cap Unlocked</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">0%</div>
                  <div className="text-sm opacity-90">Capital Gains Tax (Keep BTC)</div>
                </div>
              </div>
            </div>
          </section>

          {/* Tech Stack */}
          <section>
            <h2 className="text-3xl font-bold mb-4 gradient-text">Built On</h2>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium">Mezo Network</span>
              <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium">Solidity 0.8.28</span>
              <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium">Next.js 16</span>
              <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium">TypeScript</span>
              <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium">Wagmi</span>
              <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium">Lightning Network</span>
            </div>
          </section>
        </Card>
      </div>
    </div>
  );
}








