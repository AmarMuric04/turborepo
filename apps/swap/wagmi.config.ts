// import { base, celo, mainnet, optimism, sepolia, zora } from "wagmi/chains";
import { getDefaultConfig, type Chain } from "@rainbow-me/rainbowkit";
import {
  arbitrum,
  base,
  linea,
  mainnet,
  optimism,
  polygon,
} from "wagmi/chains";
import { http } from "wagmi";
// import { createConfig, http, type Config } from "wagmi";
// import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";

const avalanche = {
  id: 43_114,
  name: "Avalanche",
  iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png",
  iconBackground: "#fff",
  nativeCurrency: { name: "Avalanche", symbol: "AVAX", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://api.avax.network/ext/bc/C/rpc"] },
  },
  blockExplorers: {
    default: { name: "SnowTrace", url: "https://snowtrace.io" },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 11_907_934,
    },
  },
} as const satisfies Chain;

export const config = getDefaultConfig({
  appName: "MurgaSwap",
  projectId: "a",
  chains: [mainnet, avalanche, optimism, linea, base, arbitrum, polygon],
  transports: {
    [mainnet.id]: http(),
    [avalanche.id]: http(),
    [optimism.id]: http(),
    [linea.id]: http(),
    [base.id]: http(),
    [arbitrum.id]: http(),
    [polygon.id]: http(),
  },
});

// const projectId = "542ea27efeea2885d236f90be51bcc9c";

// export const config: Config = createConfig({
//   chains: [mainnet, base],
//   connectors: [injected(), walletConnect({ projectId }), metaMask(), safe()],
//   multiInjectedProviderDiscovery: false,
//   transports: {
//     [mainnet.id]: http(),
//     [base.id]: http(),
//   },
// });

// config.subscribe(
//   (state) => state.chainId,
//   (chainId) => console.log(`Chain ID changed to ${chainId}`)
// );

// unsubscribe();

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
