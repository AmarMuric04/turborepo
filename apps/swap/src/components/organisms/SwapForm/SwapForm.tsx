import {
  Balance,
  Button,
  RequireWalletConnection,
  ScaleAnimation,
  TokenIcon,
} from "components/atoms";
import { Input, TokenListModal } from "components/molecules";
import { ArrowDown, ChevronDown } from "lucide-react";
import React from "react";
import { useTokenList } from "src/hooks";
import { useTokenApproval } from "src/hooks/useApproval";
import type { TokenInfo } from "src/schemas";
import { cx } from "src/utility";
import { performSwap } from "src/utility/performSwap";
import { getAddress, zeroAddress } from "viem";
import { useAccount } from "wagmi";

type SwapTokensType = {
  token0: TokenInfo | null;
  token1: TokenInfo | null;
};

const Label: React.FC<
  React.PropsWithChildren<React.LabelHTMLAttributes<HTMLLabelElement>>
> = ({ children, ...props }) => {
  return (
    <label
      htmlFor="input"
      className="text-content-secondary text-sm"
      {...props}
    >
      {children}
    </label>
  );
};

const TokenSelector: React.FC<{
  selectedToken: TokenInfo | null;
  setSelectedToken: (token: TokenInfo) => void;
}> = ({ selectedToken, setSelectedToken }) => {
  return (
    <TokenListModal onTokenClick={setSelectedToken}>
      <ScaleAnimation>
        <div
          className={cx(
            "bg-background-secondary border-border-primary flex cursor-pointer items-center gap-1 rounded-xl border px-2 py-1",
            {
              "bg-button-primary text-white": !selectedToken,
            }
          )}
        >
          {selectedToken ? (
            <>
              <img className="size-5" src={selectedToken.logoURI} />
              <p>{selectedToken.symbol}</p>
            </>
          ) : (
            <p>Select a Token</p>
          )}
          <ChevronDown size={16} />
        </div>
      </ScaleAnimation>
    </TokenListModal>
  );
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

  const swapSelected = () => {
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
    <div className="bg-background-secondary flex flex-col gap-2 rounded-2xl p-2 shadow-2xl">
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
              selectedToken={selectedTokens.token0}
              setSelectedToken={selectToken0}
            />
          }
        />

        <div className="bg-background-secondary absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full p-1">
          <Button
            disabled={!isConnected}
            onClick={swapSelected}
            className="grid size-8 place-items-center rounded-full p-1 transition-transform duration-300 hover:rotate-360"
          >
            <ArrowDown size={16} />
          </Button>
        </div>

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
              selectedToken={selectedTokens.token1}
              setSelectedToken={selectToken1}
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
    </div>
  );
};

export { SwapForm };
