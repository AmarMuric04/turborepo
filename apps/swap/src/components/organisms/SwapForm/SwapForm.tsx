import {
  Balance,
  Button,
  Label,
  RequireWalletConnection,
  ScaleAnimation,
  SwitchButton,
  TokenIcon,
} from "components/atoms";
import { Input, FormCard, TokenSelector } from "components/molecules";
import React from "react";
import { useTokenList } from "src/hooks";
import { useTokenApproval } from "src/hooks/useApproval";
import type { TokenInfo } from "src/schemas";
import { performSwap } from "src/utility/performSwap";
import { getAddress, zeroAddress } from "viem";
import { useAccount } from "wagmi";

type SwapTokensType = {
  token0: TokenInfo | null;
  token1: TokenInfo | null;
};

const HighlightedTokens: React.FC<{
  selectedTokens: SwapTokensType;
  setSelectedTokens: (token: SwapTokensType) => void;
}> = ({ selectedTokens, setSelectedTokens }) => {
  const { chainId } = useAccount();
  const tokens = useTokenList(chainId);

  return (
    <ul className="flex items-center gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      {tokens
        .filter((token) => token.logoURI)
        .slice(0, 5)
        .map((token) => (
          <li
            key={token.name}
            onClick={() =>
              setSelectedTokens({ ...selectedTokens, token1: token })
            }
          >
            <ScaleAnimation hoverScale={1.5} activeScale={0.9}>
              <TokenIcon url={token.logoURI} />
            </ScaleAnimation>
          </li>
        ))}
    </ul>
  );
};

const PercentageSelector: React.FC = () => {
  return (
    <div className="text-button-secondary flex items-center gap-2 text-xs opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      <button>50%</button>
      <button>75%</button>
      <button>100%</button>
    </div>
  );
};

const INITIAL_TOKENS = {
  token0: null,
  token1: null,
};

const SwapForm = () => {
  const [selectedTokens, setSelectedTokens] =
    React.useState<SwapTokensType>(INITIAL_TOKENS);

  const { isConnected, address, chain } = useAccount();

  React.useEffect(() => {
    setSelectedTokens(INITIAL_TOKENS);
  }, [address, chain]);

  const selectToken0 = (token: TokenInfo) => {
    setSelectedTokens({ ...selectedTokens, token0: token });
  };

  const selectToken1 = (token: TokenInfo) => {
    setSelectedTokens({ ...selectedTokens, token1: token });
  };

  const handleSwapSelected = () => {
    setSelectedTokens({
      token0: selectedTokens.token1,
      token1: selectedTokens.token0,
    });
  };

  const { isApproved, approve, isApproving } = useTokenApproval({
    token: selectedTokens.token0
      ? getAddress(selectedTokens.token0.address)
      : zeroAddress,
    spender: address ?? zeroAddress,
    amount: BigInt(1_000),
  });

  return (
    <FormCard>
      <div className="relative flex flex-col gap-2">
        <Input
          disabled={!isConnected}
          id="from-input"
          topLeftComponent={<Label htmlFor="from-input">FROM</Label>}
          topRightComponent={<PercentageSelector />}
          bottomLeftComponent={
            <p className="text-content-secondary text-sm">$0</p>
          }
          bottomRightComponent={
            <Balance tokenAddress={selectedTokens.token0?.address} />
          }
          centerComponent={
            <TokenSelector
              item={selectedTokens.token0}
              onSelect={selectToken0}
            />
          }
        />

        <SwitchButton isDisabled={!isConnected} onClick={handleSwapSelected} />

        <Input
          disabled={!isConnected}
          id="to-input"
          topLeftComponent={<Label htmlFor="to-input">TO</Label>}
          topRightComponent={
            <HighlightedTokens
              setSelectedTokens={setSelectedTokens}
              selectedTokens={selectedTokens}
            />
          }
          bottomLeftComponent={
            <p className="text-content-secondary text-sm">$0</p>
          }
          bottomRightComponent={
            <Balance tokenAddress={selectedTokens.token1?.address} />
          }
          centerComponent={
            <TokenSelector
              item={selectedTokens.token1}
              onSelect={selectToken1}
            />
          }
        />
      </div>

      <RequireWalletConnection className="w-full rounded-xl py-4">
        {isApproved ? (
          <Button
            onClick={async () => {
              await performSwap({
                amountIn: 1_000,
                amountOutMin: 1_000,
                tokenIn: selectedTokens.token0
                  ? getAddress(selectedTokens.token0.address)
                  : zeroAddress,
                tokenOut: selectedTokens.token1
                  ? getAddress(selectedTokens.token1.address)
                  : zeroAddress,
                userAddress: address ? getAddress(address) : zeroAddress,
              });
            }}
            className="w-full rounded-xl py-4"
          >
            Swap
          </Button>
        ) : (
          <Button
            isLoading={isApproving}
            onClick={approve}
            className="w-full rounded-xl py-4"
          >
            Approve
          </Button>
        )}
      </RequireWalletConnection>
    </FormCard>
  );
};

export { SwapForm };
