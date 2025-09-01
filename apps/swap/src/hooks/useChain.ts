import type { ChainId } from "src/schemas";
import { useChains } from "src/hooks";

const useChain = ({ chainId }: { chainId: ChainId }) => {
  const chains = useChains();

  return chains.find((chain) => chain.id === chainId) ?? chains[0];
};

export { useChain };
