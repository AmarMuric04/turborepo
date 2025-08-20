import { writeContract } from "wagmi/actions";
import { erc20Abi, type Address } from "viem";
import { config } from "wagmi.config";

const UNISWAP_V2_ROUTER = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

const performSwap = async ({
  tokenAddress,
  amountIn,
}: {
  tokenAddress: Address;
  amountIn: number;
}) => {
  await writeContract(config, {
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "approve",
    args: [UNISWAP_V2_ROUTER, BigInt(amountIn)],
  });
};

export { performSwap };
