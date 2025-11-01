"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";
import { ArrowUpRight, ArrowDownLeft, Wallet, TrendingUp } from "lucide-react";
import { getHistory, type TxHistoryItem } from "@/lib/history";

export default function TransactionHistory() {
  const [items, setItems] = useState<TxHistoryItem[]>([]);

  useEffect(() => {
    const load = () => setItems(getHistory());
    load();
    const onStorage = (e: StorageEvent) => {
      if (e.key === "mbv_tx_history") load();
    };
    window.addEventListener("storage", onStorage);
    const id = setInterval(load, 4000);
    return () => {
      window.removeEventListener("storage", onStorage);
      clearInterval(id);
    };
  }, []);

  const getIcon = (type: TxHistoryItem["type"]) => {
    switch (type) {
      case "deposit":
        return <ArrowDownLeft className="h-5 w-5 text-accent" />;
      case "borrow":
        return <Wallet className="h-5 w-5 text-accent" />;
      case "withdraw":
        return <ArrowUpRight className="h-5 w-5 text-accent" />;
      case "repay":
        return <ArrowDownLeft className="h-5 w-5 text-accent" />;
      case "spend":
        return <TrendingUp className="h-5 w-5 text-accent" />;
    }
  };

  const getLabel = (type: TxHistoryItem["type"]) => {
    switch (type) {
      case "deposit":
        return "Deposit";
      case "borrow":
        return "Borrowed";
      case "withdraw":
        return "Withdraw";
      case "repay":
        return "Repayment";
      case "spend":
        return "Spend";
    }
  };

  return (
    <Card className="glass-card p-6 rounded-2xl space-y-4">
      <h3 className="font-bold text-lg">Recent Transactions</h3>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">No recent transactions</p>
      ) : (
        <div className="space-y-3">
          {items.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-accent/5 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/20">{getIcon(tx.type)}</div>
                <div>
                  <p className="font-semibold">{getLabel(tx.type)}</p>
                  <p className="text-sm text-muted-foreground">{new Date(tx.ts).toLocaleString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">
                  {tx.type === "repay" || tx.type === "spend" || tx.type === "withdraw" ? "-" : "+"}
                  {tx.amount.toLocaleString()} {tx.type === "deposit" || tx.type === "withdraw" ? "BTC" : "MUSD"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}


