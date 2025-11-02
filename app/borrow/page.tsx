"use client";

import { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import type { Address } from "viem";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { Calculator, TrendingDown, Shield } from "lucide-react";
import { formatBTC, formatMUSD } from "@/lib/utils";
import {
  useDepositCollateral,
  useBorrowMUSD,
  useGetPosition,
  useGetCollateralRatio,
  btcToSatoshis,
  usdToUnits,
  formatBTCPrice,
  useRepayLoan,
  useWithdrawCollateral,
} from "@/lib/contracts";
import TxBanner from "@/components/TxBanner";
import BottomSheet from "@/components/BottomSheet";
import { useToast } from "@/components/Toast";
import { appendHistory } from "@/lib/history";
import { addBorrowedToAvailable, deductForRepay, addMockBtcCollateral, removeMockBtcCollateral, getAppState } from "@/lib/state";

export default function BorrowPage() {
  const { address } = useAccount();
  const [btcInput, setBtcInput] = useState<string>("");
  const [borrowInput, setBorrowInput] = useState<string>("");
  const [repayInput, setRepayInput] = useState<string>("");
  const [withdrawInput, setWithdrawInput] = useState<string>("");
  const [btcPriceUsd, setBtcPriceUsd] = useState<number>(67500);
  const [termMonths, setTermMonths] = useState<number>(6);
  const [calcOpen, setCalcOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const { deposit, isPending: isDepositing, isSuccess: depositSuccess, error: depositError } = useDepositCollateral();
  const { borrow, isPending: isBorrowing, isSuccess: borrowSuccess, error: borrowError } = useBorrowMUSD();
  const { repay, isPending: isRepaying, isSuccess: repaySuccess, error: repayError } = useRepayLoan();
  const { withdraw, isPending: isWithdrawing, isSuccess: withdrawSuccess, error: withdrawError } = useWithdrawCollateral();
  const depositState = depositError ? "error" : isDepositing ? "pending" : depositSuccess ? "success" : "idle";
  const borrowState = borrowError ? "error" : isBorrowing ? "pending" : borrowSuccess ? "success" : "idle";
  const repayState = repayError ? "error" : isRepaying ? "pending" : repaySuccess ? "success" : "idle";
  const withdrawState = withdrawError ? "error" : isWithdrawing ? "pending" : withdrawSuccess ? "success" : "idle";

  const priceBig = useMemo(() => formatBTCPrice(btcPriceUsd), [btcPriceUsd]);
  const userAddr = address as Address | undefined;
  const { position, refetch } = useGetPosition(userAddr);
  const { ratio } = useGetCollateralRatio(userAddr, priceBig);

  const loanStats = {
    currentRate: 3.5,
    collateralRatio: 150,
  };

  const collateralValueUsd = useMemo(() => {
    const btc = parseFloat(btcInput || "0");
    return btc * btcPriceUsd;
  }, [btcInput, btcPriceUsd]);

  useEffect(() => {
    if (depositSuccess || borrowSuccess || repaySuccess || withdrawSuccess) {
      // Wait a bit longer for transaction to be mined and indexed
      const timer = setTimeout(() => {
        refetch();
        // Refetch again after a delay to ensure data is updated
        setTimeout(() => refetch(), 2000);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [depositSuccess, borrowSuccess, repaySuccess, withdrawSuccess, refetch]);

  // Price polling
  useEffect(() => {
    let mounted = true;
    const fetchPrice = async () => {
      try {
        const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd");
        const data = await res.json();
        if (mounted && data?.bitcoin?.usd) setBtcPriceUsd(Number(data.bitcoin.usd));
      } catch {}
    };
    fetchPrice();
    const id = setInterval(fetchPrice, 30000);
    return () => { mounted = false; clearInterval(id); };
  }, []);

  // Toasts + local history
  useEffect(() => {
    if (depositSuccess) {
      toast({ title: "Collateral deposited", variant: "success" });
      const btc = parseFloat(btcInput || "0");
      if (btc > 0) appendHistory({ type: "deposit", amount: btc });
      if (btc > 0) addMockBtcCollateral(btc); // mock fallback for hackathon UX
      setBtcInput(""); // Clear input on success
      if (navigator.vibrate) navigator.vibrate(10);
    }
    if (depositError) {
      const errorMsg = depositError.message || "Deposit failed";
      toast({ title: "Deposit failed", description: errorMsg, variant: "error" });
    }
  }, [depositSuccess, depositError, toast, btcInput]);
  
  useEffect(() => {
    if (borrowSuccess) {
      toast({ title: "Borrow successful", variant: "success" });
      const usd = parseFloat(borrowInput || "0");
      if (usd > 0) appendHistory({ type: "borrow", amount: usd });
      if (usd > 0) addBorrowedToAvailable(usd);
      setBorrowInput(""); // Clear input on success
      if (navigator.vibrate) navigator.vibrate(10);
    }
    if (borrowError) {
      const errorMsg = borrowError.message || "Borrow failed";
      toast({ title: "Borrow failed", description: errorMsg, variant: "error" });
    }
  }, [borrowSuccess, borrowError, toast, borrowInput]);
  
  useEffect(() => {
    if (repaySuccess) {
      toast({ title: "Repayment confirmed", variant: "success" });
      const usd = parseFloat(repayInput || "0");
      if (usd > 0) appendHistory({ type: "repay", amount: usd });
      if (usd > 0) deductForRepay(usd);
      setRepayInput(""); // Clear input on success
      if (navigator.vibrate) navigator.vibrate(10);
    }
    if (repayError) {
      const errorMsg = repayError.message || "Repayment failed";
      toast({ title: "Repayment failed", description: errorMsg, variant: "error" });
    }
  }, [repaySuccess, repayError, toast, repayInput]);
  
  useEffect(() => {
    if (withdrawSuccess) {
      toast({ title: "Withdrawal confirmed", variant: "success" });
      const btc = parseFloat(withdrawInput || "0");
      if (btc > 0) appendHistory({ type: "withdraw", amount: btc });
      if (btc > 0) removeMockBtcCollateral(btc); // mock fallback for hackathon UX
      setWithdrawInput(""); // Clear input on success
      if (navigator.vibrate) navigator.vibrate(10);
    }
    if (withdrawError) {
      const errorMsg = withdrawError.message || "Withdrawal failed";
      toast({ title: "Withdrawal failed", description: errorMsg, variant: "error" });
    }
  }, [withdrawSuccess, withdrawError, toast, withdrawInput]);

  // Derived borrow capacity and after-borrow ratio
  const collateralBtc = position ? Number(position.collateral) / 1e8 : 0;
  const displayCollateralBtc = collateralBtc > 0 ? collateralBtc : (getAppState().btcCollateralMock || 0);
  const borrowedUsd = position ? Number(position.borrowed) / 100 : 0;
  const interestUsd = position ? Number(position.interestOwed) / 100 : 0;
  const totalDebtUsd = borrowedUsd + interestUsd;
  const collateralUsd = collateralBtc * btcPriceUsd;
  const maxBorrowableUsd = Math.max(0, collateralUsd * (100 / loanStats.collateralRatio) - totalDebtUsd);
  const borrowDesired = parseFloat(borrowInput || "0");
  const afterBorrowDebt = Math.max(0, totalDebtUsd + (isNaN(borrowDesired) ? 0 : borrowDesired));
  const afterBorrowRatio = afterBorrowDebt > 0 ? (collateralUsd / afterBorrowDebt) * 100 : 0;

  const monthlyInterest = (borrowDesired * (loanStats.currentRate / 100)) / 12;

  const handleDeposit = async () => {
    const btc = parseFloat(btcInput);
    if (!btc || btc <= 0) {
      toast({ title: "Invalid amount", description: "Please enter a valid BTC amount", variant: "error" });
      return;
    }
    try {
      const btcAmt = btcToSatoshis(btc);
      deposit(btcAmt, priceBig);
    } catch (error: any) {
      toast({ title: "Deposit error", description: error.message || "Failed to deposit", variant: "error" });
    }
  };

  const handleBorrow = async () => {
    const usd = parseFloat(borrowInput);
    if (!usd || usd <= 0) {
      toast({ title: "Invalid amount", description: "Please enter a valid MUSD amount", variant: "error" });
      return;
    }
    try {
      const borrowAmt = usdToUnits(usd);
      borrow(borrowAmt, priceBig);
    } catch (error: any) {
      toast({ title: "Borrow error", description: error.message || "Failed to borrow", variant: "error" });
    }
  };

  const handleRepay = async () => {
    const usd = parseFloat(repayInput);
    if (!usd || usd <= 0) {
      toast({ title: "Invalid amount", description: "Please enter a valid MUSD amount", variant: "error" });
      return;
    }
    try {
      const repayAmt = usdToUnits(usd);
      repay(repayAmt);
    } catch (error: any) {
      toast({ title: "Repay error", description: error.message || "Failed to repay", variant: "error" });
    }
  };

  const handleWithdraw = async () => {
    const btc = parseFloat(withdrawInput);
    if (!btc || btc <= 0) {
      toast({ title: "Invalid amount", description: "Please enter a valid BTC amount", variant: "error" });
      return;
    }
    try {
      const amt = btcToSatoshis(btc);
      withdraw(amt, priceBig);
    } catch (error: any) {
      toast({ title: "Withdraw error", description: error.message || "Failed to withdraw", variant: "error" });
    }
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-7xl animate-fade-in">
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
                    value={btcInput}
                    onChange={(e) => setBtcInput(e.target.value)}
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
                    <p className="text-lg font-semibold">${btcPriceUsd.toLocaleString('en-US')}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Collateral Value</p>
                    <p className="text-lg font-semibold">${collateralValueUsd.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
                  </div>
                </div>

                <Button className="w-full" size="lg" isLoading={isDepositing} onClick={handleDeposit}>
                  <Shield className="w-5 h-5 mr-2" />
                  Deposit Collateral
                </Button>
                <TxBanner state={depositState} successText="Collateral deposited" pendingText="Confirm deposit in wallet..." />
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
                    value={borrowInput}
                    onChange={(e) => setBorrowInput(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => setBorrowInput(maxBorrowableUsd.toFixed(2))}
                    >
                      MAX
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Max borrow: {formatMUSD(maxBorrowableUsd)}</p>
                </div>

                {/* Slider */}
                <div className="px-1">
                  <input
                    type="range"
                    min={0}
                    max={Math.max(0, Math.floor(maxBorrowableUsd))}
                    value={Math.max(0, Math.min(Number(borrowInput || 0), Math.floor(maxBorrowableUsd)))}
                    onChange={(e) => setBorrowInput(String(e.target.value))}
                    className="w-full accent-[hsl(var(--primary))]"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0</span>
                    <span>{formatMUSD(maxBorrowableUsd)}</span>
                  </div>
                </div>

                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Current Collateral Ratio</span>
                    <span className="text-sm font-semibold">{ratio ? `${Number(ratio)}%` : "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Required Ratio</span>
                    <span className="text-sm font-semibold">{loanStats.collateralRatio}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">After Borrow</span>
                    <span className="text-sm font-semibold">{afterBorrowDebt > 0 ? `${afterBorrowRatio.toFixed(0)}%` : "—"}</span>
                  </div>
                  {/* Ratio bar */}
                  <div className="h-2 rounded-full overflow-hidden bg-black/20 mt-2">
                    <div
                      className={"h-full transition-all " + (afterBorrowRatio >= 200 ? "bg-green-500" : afterBorrowRatio >= 150 ? "bg-yellow-500" : "bg-red-500")}
                      style={{ width: `${Math.max(0, Math.min(100, afterBorrowRatio / 3))}%` }}
                    />
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-center gap-2">
                  {[3, 6, 12].map((m) => (
                    <button
                      key={m}
                      onClick={() => setTermMonths(m)}
                      className={"px-3 py-2 rounded-lg border text-sm " + (termMonths === m ? "bg-[hsl(var(--card))] border-white/20" : "border-white/10 hover:bg-white/5")}
                    >
                      {m} mo
                    </button>
                  ))}
                  <div className="ml-auto text-sm text-gray-600 dark:text-gray-400">
                    Est. monthly interest: <span className="font-semibold">{formatMUSD(monthlyInterest || 0)}</span>
                  </div>
                </div>

                <Button className="w-full" size="lg" variant="secondary" isLoading={isBorrowing} onClick={handleBorrow}>
                  <TrendingDown className="w-5 h-5 mr-2" />
                  Borrow MUSD
                </Button>
                <TxBanner state={borrowState} successText="Borrow successful" pendingText="Confirm borrow in wallet..." />
              </div>
            </Card>

            <Card>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Repay Loan</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Repay your outstanding MUSD balance. Interest is repaid before principal.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Amount to Repay (MUSD)</label>
                  <input
                    type="number"
                    placeholder="0.0"
                    value={repayInput}
                    onChange={(e) => setRepayInput(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <Button className="w-full" size="lg" variant="secondary" isLoading={isRepaying} onClick={handleRepay}>
                  Repay Loan
                </Button>
                <TxBanner state={repayState} successText="Repayment confirmed" pendingText="Confirm repay in wallet..." />
              </div>
            </Card>

            <Card>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Withdraw Collateral</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Withdraw a portion of your collateral if your position remains above the 150% ratio.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Amount to Withdraw (BTC)</label>
                  <input
                    type="number"
                    placeholder="0.0"
                    step="0.00000001"
                    value={withdrawInput}
                    onChange={(e) => setWithdrawInput(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <Button className="w-full" size="lg" isLoading={isWithdrawing} onClick={handleWithdraw}>
                  Withdraw Collateral
                </Button>
                <TxBanner state={withdrawState} successText="Withdrawal confirmed" pendingText="Confirm withdraw in wallet..." />
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
                  <p className="text-xl font-bold">{formatBTC(displayCollateralBtc)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Borrowed</p>
                  <p className="text-xl font-bold">{position ? formatMUSD(Number(position.borrowed) / 100) : formatMUSD(0)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Collateral Ratio</p>
                  <p className="text-xl font-bold">{ratio ? `${Number(ratio)}%` : "--"}</p>
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
                  <Button variant="ghost" size="sm" className="mt-2" onClick={() => setCalcOpen(true)}>
                    Open Calculator
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
        {/* BottomSheet Calculator */}
        <BottomSheet open={calcOpen} onClose={() => setCalcOpen(false)} title="Loan Calculator">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Collateral (BTC)</p>
                <p className="text-xl font-bold">{formatBTC(displayCollateralBtc)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Collateral (USD)</p>
                <p className="text-xl font-bold">{formatMUSD(collateralUsd)}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Max Borrow</p>
                <p className="text-xl font-bold">{formatMUSD(maxBorrowableUsd)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">After-borrow Ratio</p>
                <p className="text-xl font-bold">{afterBorrowDebt ? `${afterBorrowRatio.toFixed(0)}%` : "—"}</p>
              </div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Monthly interest at {loanStats.currentRate}% APR for {termMonths} months: <span className="font-semibold">{formatMUSD(monthlyInterest)}</span>
            </div>
            <div className="flex gap-3">
              <Button className="flex-1" onClick={() => setCalcOpen(false)}>Done</Button>
            </div>
          </div>
        </BottomSheet>
        </main>
      </div>
    </div>
  );
}

