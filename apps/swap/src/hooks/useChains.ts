import { config } from "wagmi.config";

export const useChains = () => {
  return [...config.chains];
};
