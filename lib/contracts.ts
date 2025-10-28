/**
 * Smart Contract Integration
 * 
 * This file contains hooks and utilities for interacting with deployed contracts
 */

import { useWriteContract, useReadContract } from 'wagmi';
import { Address } from 'viem';

// ✅ DEPLOYED CONTRACT ADDRESS
const VAULT_MANAGER_ADDRESS = '0xD93111E3C9E9C68C1BaE07F1E3c5f3ce483c9b8f' as Address;

// ✅ IMPORTED ABI
import VaultManagerABI from './abis/VaultManager.json';

/**
 * Hook to deposit BTC collateral
 */
export function useDepositCollateral() {
  const { writeContract, isPending, isSuccess, error } = useWriteContract();
  
  const deposit = (btcAmount: bigint, btcPrice: bigint) => {
    writeContract({
      address: VAULT_MANAGER_ADDRESS,
      abi: VaultManagerABI,
      functionName: 'depositCollateral',
      args: [btcAmount, btcPrice],
    });
  };
  
  return { deposit, isPending, isSuccess, error };
}

/**
 * Hook to borrow MUSD
 */
export function useBorrowMUSD() {
  const { writeContract, isPending, isSuccess, error } = useWriteContract();
  
  const borrow = (amount: bigint, btcPrice: bigint) => {
    writeContract({
      address: VAULT_MANAGER_ADDRESS,
      abi: VaultManagerABI,
      functionName: 'borrowMUSD',
      args: [amount, btcPrice],
    });
  };
  
  return { borrow, isPending, isSuccess, error };
}

/**
 * Hook to repay loan
 */
export function useRepayLoan() {
  const { writeContract, isPending, isSuccess, error } = useWriteContract();
  
  const repay = (amount: bigint) => {
    writeContract({
      address: VAULT_MANAGER_ADDRESS,
      abi: VaultManagerABI,
      functionName: 'repayLoan',
      args: [amount],
    });
  };
  
  return { repay, isPending, isSuccess, error };
}

/**
 * Hook to withdraw collateral
 */
export function useWithdrawCollateral() {
  const { writeContract, isPending, isSuccess, error } = useWriteContract();
  
  const withdraw = (amount: bigint, btcPrice: bigint) => {
    writeContract({
      address: VAULT_MANAGER_ADDRESS,
      abi: VaultManagerABI,
      functionName: 'withdrawCollateral',
      args: [amount, btcPrice],
    });
  };
  
  return { withdraw, isPending, isSuccess, error };
}

/**
 * Hook to get user's position
 */
export function useGetPosition(userAddress?: Address) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: VAULT_MANAGER_ADDRESS,
    abi: VaultManagerABI,
    functionName: 'getPosition',
    args: userAddress ? [userAddress] : undefined,
  });
  
  return { position: data, isLoading, error, refetch };
}

/**
 * Hook to get collateral ratio
 */
export function useGetCollateralRatio(userAddress?: Address, btcPrice?: bigint) {
  const { data, isLoading, error } = useReadContract({
    address: VAULT_MANAGER_ADDRESS,
    abi: VaultManagerABI,
    functionName: 'getCollateralRatio',
    args: userAddress && btcPrice ? [userAddress, btcPrice] : undefined,
  });
  
  return { ratio: data, isLoading, error };
}

/**
 * Utility to convert USD to smallest unit (with 2 decimals)
 */
export function usdToUnits(usdAmount: number): bigint {
  return BigInt(Math.floor(usdAmount * 100));
}

/**
 * Utility to convert BTC to satoshis
 */
export function btcToSatoshis(btcAmount: number): bigint {
  return BigInt(Math.floor(btcAmount * 100000000));
}

/**
 * Utility to convert satoshis to BTC
 */
export function satoshisToBTC(satoshis: bigint): number {
  return Number(satoshis) / 100000000;
}

/**
 * Utility to format BTC price with proper decimals
 */
export function formatBTCPrice(priceUSD: number): bigint {
  // BTC price with 8 decimals for precision
  return BigInt(Math.floor(priceUSD * 100000000));
}

