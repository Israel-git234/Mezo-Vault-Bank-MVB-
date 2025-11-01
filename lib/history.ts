export type TxHistoryItem = {
  id: string;
  type: "deposit" | "borrow" | "repay" | "withdraw" | "spend";
  amount: number; // in display currency (BTC for deposit/withdraw, USD for borrow/repay/spend)
  meta?: Record<string, unknown>;
  ts: number;
};

const KEY = "mbv_tx_history";

export function getHistory(): TxHistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function appendHistory(entry: Omit<TxHistoryItem, "id" | "ts">) {
  if (typeof window === "undefined") return;
  const prev = getHistory();
  const item: TxHistoryItem = {
    id: Math.random().toString(36).slice(2),
    ts: Date.now(),
    ...entry,
  };
  const next = [item, ...prev].slice(0, 100);
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {}
}



