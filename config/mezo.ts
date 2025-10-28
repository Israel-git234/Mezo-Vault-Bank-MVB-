/**
 * Mezo Network Configuration
 * Configuration for Mezo Network integration, testnet, and contracts
 */

export const MEZO_CONFIG = {
  // Network Information
  network: {
    name: "Mezo Testnet",
    chainId: 31611,
    rpcUrl: "https://rpc.test.mezo.org",
    blockExplorer: "https://explorer.test.mezo.org",
    nativeCurrency: {
      name: "Bitcoin",
      symbol: "BTC",
      decimals: 18,
    },
  },

  // Contract Addresses (DEPLOYED!)
  contracts: {
    vaultManager: "0xD93111E3C9E9C68C1BaE07F1E3c5f3ce483c9b8f", // BTC Collateral Vault - DEPLOYED ✅
    musd: "0x118917a40FAF1CD7a13dB0Ef56C86De7973Ac503", // MUSD Stablecoin (Official Mezo Testnet)
    credoProtocol: "0x0000000000000000000000000000000000000000", // Credo-ID Protocol
    yieldVaults: "0x0000000000000000000000000000000000000000", // Smart Yield Vaults
    lightningGateway: "0x0000000000000000000000000000000000000000", // Lightning Gateway
  },

  // Mezo Passport Configuration
  passport: {
    version: "1.0.0",
    apiUrl: "https://passport.mezo.network", // Update with actual API
  },

  // Loan Configuration
  loans: {
    minCollateralRatio: 150, // 150% collateralization required
    maxLoanTerm: 365, // days
    liquidationThreshold: 125, // 125% - triggers liquidation
    fixedRateAPR: 3.5, // Default 3.5% APR
  },

  // Yield Configuration
  yield: {
    autoRepayEnabled: true,
    minAPY: 5, // Minimum expected APY
    maxAPY: 25, // Maximum expected APY
  },

  // Lightning Network Configuration
  lightning: {
    enabled: true,
    invoiceExpiry: 3600, // 1 hour in seconds
    maxPaymentAmount: 10000, // Max $10k per payment
  },
};

export const APP_CONFIG = {
  name: "MezoBank Vaults",
  tagline: "Spend, Save, and Grow Bitcoin — All in One App.",
  version: "0.1.0",
  defaultCurrency: "USD",
};



