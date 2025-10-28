// Wagmi / Wallet configuration for MezoBank Vaults
// Define Mezo Testnet chain and export Wagmi config

import { http, defineChain } from "viem";
import { createConfig } from "wagmi";

export const mezoTestnet = defineChain({
	id: 31611,
	name: "Mezo Testnet",
	nativeCurrency: { name: "Bitcoin", symbol: "BTC", decimals: 18 },
	rpcUrls: {
		default: { http: ["https://rpc.test.mezo.org"] },
	},
	blockExplorers: {
		default: { name: "Mezo Explorer", url: "https://explorer.test.mezo.org" },
	},
});

export const wagmiConfig = createConfig({
	chains: [mezoTestnet],
	transports: {
		[mezoTestnet.id]: http(mezoTestnet.rpcUrls.default.http[0]),
	},
});

