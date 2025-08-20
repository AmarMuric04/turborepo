import { writeContract } from "wagmi/actions";
import { config } from "wagmi.config";
import { Uniswapv2Router } from "src/abis";
import type { Address } from "viem";

const UNISWAP_V2_ROUTER = "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff"; // Update for your network

const performSwap = async ({
  amountIn,
  amountOutMin,
  tokenIn,
  tokenOut,
  userAddress,
}: {
  amountIn: number;
  amountOutMin: number;
  tokenIn: Address;
  tokenOut: Address;
  userAddress: Address;
}) => {
  const hash = await writeContract(config, {
    address: UNISWAP_V2_ROUTER,
    abi: Uniswapv2Router,
    functionName: "swapExactTokensForTokens",
    args: [
      BigInt(amountIn),
      BigInt(amountOutMin),
      [tokenIn, tokenOut],
      userAddress,
      BigInt(Math.floor(Date.now() / 1000) + 60 * 20),
    ],
  });
  return hash;
};

export { performSwap };
