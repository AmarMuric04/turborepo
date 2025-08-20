import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import axios from "axios";
import { TokenListSchema } from "src/schemas";

export const useTokenList = (id?: number) => {
  const { chainId } = useAccount();

  const usedId = id ? id : chainId ? chainId : null;

  const { data } = useQuery({
    queryKey: ["tokenList"],
    queryFn: async () => {
      const res = await axios.get("https://tokens.uniswap.org");
      return TokenListSchema.parse(res.data);
    },
    enabled: !!usedId,
  });

  return data
    ? data?.tokens.filter((token) => token.chainId === usedId).splice(0, 15)
    : [];
};
