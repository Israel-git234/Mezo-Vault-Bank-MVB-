/**
 * TypeScript type definitions for MezoBank Vaults
 */

export type Address = `0x${string}`;
export type Hex = `0x${string}`;

// User Account Types
export interface User {
  address: Address;
  passportId?: string;
  credoScore?: number;
  fallbackFeeAddress?: Address;
  onFreeTrial?: boolean;
}

export interface UserBalances {
  btc: number;
  musd: number;
  mezo: number;
}

// Loan Types
export interface Loan {
  id: string;
  borrower: Address;
  principalAmount: number; // in MUSD
  collateralAmount: number; // in BTC
  interestRate: number; // APR percentage
  startDate: Date;
  endDate: Date;
  repaymentAmount: number;
  status: LoanStatus;
  collateralRatio: number;
}

export enum LoanStatus {
  Active = "active",
  Repaid = "repaid",
  Liquidated = "liquidated",
  Defaulted = "defaulted",
}

// Vault Types
export interface Vault {
  id: string;
  name: string;
  type: VaultType;
  apy: number; // Annual Percentage Yield
  tvl: number; // Total Value Locked
  description: string;
  riskLevel: RiskLevel;
  strategy: string;
  minDeposit: number;
  maxDeposit?: number;
}

export enum VaultType {
  Stable = "stable",
  Growth = "growth",
  Balanced = "balanced",
  Aggressive = "aggressive",
}

export enum RiskLevel {
  Low = "low",
  Medium = "medium",
  High = "high",
}

export interface UserVaultPosition {
  vaultId: string;
  depositedAmount: number;
  currentValue: number;
  earnings: number;
  apy: number;
  share: number; // Percentage of vault
}

// Credo Protocol Types
export interface CredoScore {
  address: Address;
  score: number; // 0-1000
  level: CredoLevel;
  factors: {
    loanHistory: number;
    repaymentReliability: number;
    yieldParticipation: number;
    accountAge: number;
  };
  lastUpdated: Date;
}

export enum CredoLevel {
  Bronze = "bronze",
  Silver = "silver",
  Gold = "gold",
  Platinum = "platinum",
  Diamond = "diamond",
}

// Lightning Network Types
export interface LightningInvoice {
  paymentRequest: string;
  amount: number;
  description?: string;
  expiry: Date;
}

export interface LightningPayment {
  invoice: string;
  amount: number;
  status: PaymentStatus;
  txHash?: string;
  timestamp: Date;
}

export enum PaymentStatus {
  Pending = "pending",
  Completed = "completed",
  Failed = "failed",
}

// Transaction Types
export interface Transaction {
  id: string;
  type: TransactionType;
  from: Address;
  to?: Address;
  amount: number;
  token: string;
  timestamp: Date;
  status: TransactionStatus;
  txHash?: Hex;
}

export enum TransactionType {
  Deposit = "deposit",
  Withdraw = "withdraw",
  Borrow = "borrow",
  Repay = "repay",
  YieldEarn = "yield_earn",
  Spend = "spend",
  Claim = "claim",
}

export enum TransactionStatus {
  Pending = "pending",
  Confirmed = "confirmed",
  Failed = "failed",
}

// Market Data Types
export interface MarketData {
  btcPrice: number;
  musdPrice: number;
  totalTVL: number;
  totalLoans: number;
  totalUsers: number;
  averageAPY: number;
}

// Oracle Types
export interface OracleData {
  btcUsd: number;
  lastUpdate: Date;
  source: string;
}







