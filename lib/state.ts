/**
 * Local app state for simulated features (spend, yield, credo score)
 */

export interface AppState {
  musdAvailable: number; // spendable simulated MUSD
  vaultBalance: number; // MUSD invested in vault
  vaultAccrued: number; // accrued yield not yet reinvested/withdrawn
  lastYieldTs: number; // timestamp of last yield accrual
  autoRepayEnabled: boolean;
  credoScore: number; // display score (650 default)
}

const KEY = "mbv_app_state";

function now(): number { return typeof Date !== 'undefined' ? Date.now() : 0; }

export function getAppState(): AppState {
  if (typeof window === 'undefined') {
    return {
      musdAvailable: 0,
      vaultBalance: 0,
      vaultAccrued: 0,
      lastYieldTs: 0,
      autoRepayEnabled: false,
      credoScore: 650,
    };
  }
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { musdAvailable: 0, vaultBalance: 0, vaultAccrued: 0, lastYieldTs: 0, autoRepayEnabled: false, credoScore: 650 };
    return JSON.parse(raw) as AppState;
  } catch {
    return { musdAvailable: 0, vaultBalance: 0, vaultAccrued: 0, lastYieldTs: 0, autoRepayEnabled: false, credoScore: 650 };
  }
}

function setAppState(next: AppState) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(next));
}

export function updateAppState(patch: Partial<AppState>) {
  const current = getAppState();
  setAppState({ ...current, ...patch });
}

export function addBorrowedToAvailable(usd: number) {
  const s = getAppState();
  s.musdAvailable = Math.max(0, s.musdAvailable + usd);
  // Reward Credo on borrow
  s.credoScore = Math.min(1000, s.credoScore + 10);
  setAppState(s);
}

export function deductForRepay(usd: number) {
  const s = getAppState();
  s.musdAvailable = Math.max(0, s.musdAvailable - usd);
  setAppState(s);
}

export function applySpend(usd: number) {
  const s = getAppState();
  s.musdAvailable = Math.max(0, s.musdAvailable - usd);
  setAppState(s);
}

export function toggleAutoRepay(enabled: boolean) {
  updateAppState({ autoRepayEnabled: enabled });
}

export function accrueYield(apr = 0.08) {
  const s = getAppState();
  const last = s.lastYieldTs || now();
  const dtMs = now() - last;
  if (dtMs <= 0 || s.vaultBalance <= 0) return;
  const years = dtMs / (365 * 24 * 60 * 60 * 1000);
  const earned = s.vaultBalance * apr * years;
  s.vaultAccrued += earned;
  s.lastYieldTs = now();
  // Auto-repay simulation: move some accrued to available to pay interest
  if (s.autoRepayEnabled && s.vaultAccrued > 0) {
    // Make accrued available as spendable to represent interest coverage
    // (we don't modify on-chain debt in this simulation)
    s.musdAvailable += s.vaultAccrued * 0.2; // assume 20% of yield earmarked for interest
    s.vaultAccrued *= 0.8;
  }
  setAppState(s);
}

export function investToVault(usd: number) {
  const s = getAppState();
  const amt = Math.max(0, Math.min(usd, s.musdAvailable));
  s.musdAvailable -= amt;
  s.vaultBalance += amt;
  if (!s.lastYieldTs) s.lastYieldTs = now();
  setAppState(s);
}

export function withdrawFromVault(usd: number) {
  const s = getAppState();
  const total = s.vaultBalance + s.vaultAccrued;
  const amt = Math.max(0, Math.min(usd, total));
  if (amt <= s.vaultAccrued) {
    s.vaultAccrued -= amt;
  } else {
    const rem = amt - s.vaultAccrued;
    s.vaultAccrued = 0;
    s.vaultBalance = Math.max(0, s.vaultBalance - rem);
  }
  s.musdAvailable += amt;
  setAppState(s);
}

export function reinvestAccrued() {
  const s = getAppState();
  s.vaultBalance += s.vaultAccrued;
  s.vaultAccrued = 0;
  setAppState(s);
}


