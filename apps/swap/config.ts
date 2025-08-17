// import { base, celo, mainnet, optimism, sepolia, zora } from "wagmi/chains";
// import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { base, mainnet } from "wagmi/chains";
import { createConfig, http, type Config } from "wagmi";
import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";

// export const config = getDefaultConfig({
//   appName: "MurgaSwap",
//   projectId: "a",
//   chains: [base, mainnet, optimism, zora, sepolia, celo],
//   transports: {
//     [base.id]: http(),
//     [mainnet.id]: http(),
//     [zora.id]: http(),
//     [sepolia.id]: http(),
//     [celo.id]: http(),
//   },
// });

const projectId = "542ea27efeea2885d236f90be51bcc9c";

export const config: Config = createConfig({
  chains: [mainnet, base],
  connectors: [injected(), walletConnect({ projectId }), metaMask(), safe()],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
