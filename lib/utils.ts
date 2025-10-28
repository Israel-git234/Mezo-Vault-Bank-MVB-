import clsx, { type ClassValue } from "clsx";

/**
 * Utility function to merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Format currency values with appropriate decimals
 */
export function formatCurrency(value: number, decimals: number = 2): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Format BTC with appropriate decimals
 */
export function formatBTC(value: number): string {
  return formatCurrency(value, 8) + " BTC";
}

/**
 * Format MUSD with appropriate decimals
 */
export function formatMUSD(value: number): string {
  return "$" + formatCurrency(value, 2);
}

/**
 * Format percentage values
 */
export function AIFormatter(value: number, decimals: number = 2): string {
  return formatCurrency(value, decimals) + "%";
}

/**
 * Truncate Ethereum addresses for display
 */
export function truncateAddress(address: string): string {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Calculate collateral ratio
 */
export function calculateCollateralRatio(
  collateralTrue: number,
  loanAmount: number
): number {
  if (loanAmount === 0) return 0;
  return (collateralTrue / loanAmount) * 100;
}

/**
 * Check if loan is at risk of liquidation
 */
export function isLoanAtRisk(collateralRatio: number, threshold: number = 125): boolean {
  return collateralRatio <= threshold;
}

/**
 * Generate mock transaction hash
 */
export function generateTxHash(): `0x${string}` {
  const randomHex = Array(64)
    .fill(0)
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");
  return `0x${randomHex}`;
}

/**
 * Shorten strings for display
 */
export function shortenString(str: string, maxLength: number = 20): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + "...";
}


