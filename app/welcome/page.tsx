"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { Bitcoin, Shield, TrendingUp, Zap, ArrowRight, CheckCircle } from "lucide-react";

export default function WelcomePage() {
  const [step, setStep] = useState(1);
  const { isConnected } = useAccount();
  const router = useRouter();

  // Auto-redirect if already connected
  if (isConnected && step === 1) {
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-orange-500 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Splash/Intro Screen */}
        {step === 1 && (
          <div className="text-center animate-fade-in">
            <div className="w-24 h-24 gradient-bg rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl">
              <Bitcoin className="w-14 h-14 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              MezoBank Vaults
            </h1>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Your Bitcoin-backed financial platform.<br />
              Borrow, Save, and Spend — All in One Place.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-indigo-600 hover:bg-gray-100 shadow-xl"
              onClick={() => setStep(2)}
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}

        {/* Onboarding Steps */}
        {step === 2 && (
          <Card className="p-8 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Welcome to MezoBank</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Let's set up your account in 3 simple steps
              </p>
            </div>

            {/* Progress Steps */}
            <div className="flex justify-between mb-12 relative">
              <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 -z-10"></div>
              
              <div className="flex flex-col items-center flex-1">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold mb-2">
                  1
                </div>
                <span className="text-sm font-medium">Connect</span>
              </div>
              
              <div className="flex flex-col items-center flex-1">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 flex items-center justify-center font-bold mb-2">
                  2
                </div>
                <span className="text-sm">Verify</span>
              </div>
              
              <div className="flex flex-col items-center flex-1">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 flex items-center justify-center font-bold mb-2">
                  3
                </div>
                <span className="text-sm">Start</span>
              </div>
            </div>

            {/* Step Content */}
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Shield className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Connect Your Wallet</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Connect your MetaMask wallet to access your Bitcoin-backed account
                </p>
              </div>

              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Secure & Non-Custodial</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">You always control your funds</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Built on Mezo Network</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Bitcoin-native DeFi infrastructure</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <div>
                    <p className="font-medium">No KYC Required</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Start using immediately</p>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full" 
                size="lg"
                onClick={() => setStep(3)}
              >
                Connect Wallet
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <p className="text-center text-sm text-gray-500">
                Don't have a wallet? <a href="https://metamask.io" target="_blank" className="text-indigo-600 hover:underline">Install MetaMask</a>
              </p>
            </div>
          </Card>
        )}

        {/* Features Overview */}
        {step === 3 && (
          <Card className="p-8 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">What You Can Do</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Explore all the features available to you
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
                <Bitcoin className="w-12 h-12 text-indigo-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Borrow Against BTC</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Fixed 3.5% APR. Keep your Bitcoin, access liquidity.
                </p>
              </div>

              <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <TrendingUp className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Earn Yield</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Deploy funds into vaults. Auto-repay loan interest.
                </p>
              </div>

              <div className="p-6 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                <Zap className="w-12 h-12 text-orange-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Spend Globally</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Pay via Lightning. Use your credit line anywhere.
                </p>
              </div>

              <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <Shield className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Build Credit</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Earn Credo Score. Portable on-chain reputation.
                </p>
              </div>
            </div>

            <Button 
              className="w-full" 
              size="lg"
              onClick={() => router.push("/dashboard")}
            >
              Enter Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}

