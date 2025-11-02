/**
 * Smart Contract Integration
 * 
 * This file contains hooks and utilities for interacting with deployed contracts
 * Updated: Fixed deposit function to send native BTC value
 */

import { useWriteContract, useReadContract } from 'wagmi';
import type { Address } from 'viem';

// ✅ DEPLOYED CONTRACT ADDRESS
export const VAULT_MANAGER_ADDRESS = '0xD93111E3C9E9C68C1BaE07F1E3c5f3ce483c9b8f' as Address;

// ✅ IMPORTED ABI
import VaultManagerABI from './abis/VaultManager.json';
export { VaultManagerABI };

// Types returned by the contract
export interface UserPosition {
  collateral: bigint; // satoshis
  borrowed: bigint;   // cents
  interestOwed: bigint; // cents
  lastUpdate: bigint; // timestamp
  btcPrice: bigint; // BTC price at time of last update (8 decimals)
}

/**
 * Hook to deposit BTC collateral
 */
export function useDepositCollateral() {
  const { writeContract, isPending, isSuccess, error } = useWriteContract();
  
  const deposit = (btcAmount: bigint, btcPrice: bigint) => {
    if (btcAmount <= 0n) {
      throw new Error('BTC amount must be greater than 0');
    }
    
    // Convert satoshis (8 decimals) to wei (18 decimals) for native BTC
    // Mezo Testnet native currency uses 18 decimals
    const valueInWei = btcAmount * BigInt(1e10); // 1e8 satoshis * 1e10 = 1e18 wei
    
    writeContract({
      address: VAULT_MANAGER_ADDRESS,
      abi: VaultManagerABI,
      functionName: 'depositCollateral',
      args: [btcAmount, btcPrice],
      value: valueInWei, // Send native BTC with the transaction
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
    if (amount <= 0n) {
      throw new Error('Borrow amount must be greater than 0');
    }
    
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
    if (amount <= 0n) {
      throw new Error('Repay amount must be greater than 0');
    }
    
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
    if (amount <= 0n) {
      throw new Error('Withdraw amount must be greater than 0');
    }
    
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
    query: {
      enabled: !!userAddress,
      refetchInterval: 5000, // Refetch every 5 seconds
    },
  });

  // Handle tuple/struct return format
  let position: UserPosition | undefined = undefined;
  
  if (data) {
    // Contract returns a struct tuple: [collateral, borrowed, interestOwed, lastUpdate, btcPrice]
    // Check if it's an array (tuple) or already an object
    if (Array.isArray(data)) {
      position = {
        collateral: BigInt(data[0] || 0),
        borrowed: BigInt(data[1] || 0),
        interestOwed: BigInt(data[2] || 0),
        lastUpdate: BigInt(data[3] || 0),
        btcPrice: BigInt(data[4] || 0),
      };
    } else if (typeof data === 'object' && 'collateral' in data) {
      // Already in object format
      position = data as UserPosition;
    }
  }

  return { position, isLoading, error, refetch };
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

  return { ratio: data as unknown as bigint | undefined, isLoading, error };
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

