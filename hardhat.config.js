/* eslint-disable @typescript-eslint/no-require-imports */
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {},
    // Add Mezo testnet configuration when RPC URL is available
    mezo: {
      url: "https://rpc.mezo.network", // Update with actual RPC URL
      chainId: 7777, // Update with actual chain ID
      accounts: [], // Add private keys for deployment
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};

