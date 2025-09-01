import { config } from "wagmi.config";

type GetChainReturnType = (typeof config)["chains"];

export const getChains = (): GetChainReturnType => {
  return config.chains;
};
