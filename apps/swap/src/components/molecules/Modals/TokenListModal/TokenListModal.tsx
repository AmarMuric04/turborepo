import {
  Balance,
  Button,
  ConnectWallet,
  ScaleAnimation,
  TokenIcon,
} from "components/atoms";
import { ChainListDropdown, Modal } from "components/molecules";
import { Clock, Coins, Search } from "lucide-react";
import React from "react";
import { useTokenList } from "src/hooks";
import { useAccount, useChains, useSwitchChain } from "wagmi";
import { useDebounce } from "use-debounce";
import type { TokenInfo } from "src/schemas";
import useLocalStorage from "use-local-storage";
import { truncateEthAddress } from "src/utility";

const TokenList: React.FC<{
  tokens: TokenInfo[];
  onTokenClick: (token: TokenInfo) => void;
}> = ({ tokens, onTokenClick }) => {
  return (
    <ul className="flex flex-col gap-2">
      {tokens.map((token) => (
        <li key={token.address}>
          <ScaleAnimation className="hover:bg-background-tertiary w-full rounded-2xl">
            <button
              onClick={() => onTokenClick(token)}
              className="flex size-full items-center gap-4 p-2 text-start"
            >
              <TokenIcon className="size-10" url={token.logoURI} />
              <div className="flex w-full flex-col">
                <div className="flex items-center justify-between">
                  <p>{token.name}</p>
                  <Balance isJustBalance tokenAddress={token.address} />
                </div>
                <div className="flex items-end gap-1">
                  <p className="text-content-secondary">{token.symbol}</p>
                  <p className="text-content-tertiary mb-0.5 truncate text-xs whitespace-nowrap italic">
                    {truncateEthAddress({ address: token.address })}
                  </p>
                </div>
              </div>
            </button>
          </ScaleAnimation>
        </li>
      ))}
    </ul>
  );
};

const TokenListModal: React.FC<
  React.PropsWithChildren<{
    onTokenClick: (token: TokenInfo) => void;
  }>
> = ({ children, onTokenClick }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [recentTokens, setRecentTokens] = useLocalStorage<
    Record<string, TokenInfo[]>
  >("recent-tokens", {});
  const [value] = useDebounce(searchValue, 500);
  const tokenList = useTokenList();
  const chains = useChains();
  const { isConnected, chain } = useAccount();
  const { switchChain } = useSwitchChain();

  const currentChainId = chain ? chain?.id?.toString() : "1";
  const currentRecentTokens = recentTokens[currentChainId]
    ? recentTokens[currentChainId]
    : [];

  const tokensWithoutRecents = React.useMemo(() => {
    const recentTokenAddresses = new Set(
      currentRecentTokens.map((t) => t.address)
    );
    return tokenList.filter(
      (token) => !recentTokenAddresses.has(token.address)
    );
  }, [tokenList, currentRecentTokens]);

  const addRecentToken = (token: TokenInfo) => {
    const currentChainRecentTokens = recentTokens[currentChainId]
      ? recentTokens[currentChainId]
      : [];
    const filteredTokens = currentChainRecentTokens.filter(
      (t) => t.address !== token.address
    );

    const newRecentTokens = [token, ...filteredTokens].slice(0, 5);

    setRecentTokens({
      ...recentTokens,
      [currentChainId]: newRecentTokens,
    });
  };

  const searchedTokens = React.useMemo(() => {
    if (!value) return tokenList;

    const searchTerm = value.toLowerCase();
    return tokenList.filter(
      (token) =>
        token.name.toLowerCase().includes(searchTerm) ||
        token.symbol.toLowerCase().includes(searchTerm)
    );
  }, [value, tokenList]);

  const handleTokenClick = (token: TokenInfo) => {
    addRecentToken(token);
    onTokenClick(token);
    setIsOpen(false);
  };

  React.useEffect(() => {
    if (!open) {
      setSearchValue("");
    }
  }, [open]);

  const isSearching = isConnected && value;

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Select a token"
      button={<div onClick={() => setIsOpen(true)}>{children}</div>}
    >
      <div className="focus-within:outline-button-primary bg-background-primary border-border-primary mt-2 mb-8 flex items-center gap-2 overflow-hidden rounded-lg px-2 focus-within:outline-2">
        <button className="grid place-items-center pr-2">
          <Search className="text-content-tertiary" size={18} />
        </button>

        <input
          disabled={!isConnected}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="USDC"
          className="w-full rounded-r-lg py-2 text-xl focus:outline-none"
        />

        <ChainListDropdown
          onChainClick={switchChain}
          className="bg-background-secondary flex items-center gap-2 rounded-md p-1"
        >
          <ScaleAnimation>
            <p className="text-sm">
              {chain?.nativeCurrency.symbol ?? chains[0].nativeCurrency.symbol}
            </p>
          </ScaleAnimation>
        </ChainListDropdown>
      </div>

      <div className="flex h-96 flex-col gap-2 overflow-auto">
        {!isConnected && (
          <div className="flex flex-col items-center gap-2">
            <p className="text-content-tertiary">Wallet not connected</p>
            <ConnectWallet />
          </div>
        )}

        {isSearching && searchedTokens.length > 0 && (
          <>
            <div className="text-content-tertiary flex items-center gap-1">
              <Search size={16} />
              <h2>Search results</h2>
            </div>
            <TokenList
              tokens={searchedTokens}
              onTokenClick={handleTokenClick}
            />
          </>
        )}

        {isSearching && searchedTokens.length === 0 && (
          <p className="text-content-tertiary text-center">
            No results found for{" "}
            <span className="text-content-primary">{value}</span>.
          </p>
        )}

        {!isSearching &&
          recentTokens[currentChainId] &&
          recentTokens[currentChainId].length > 0 && (
            <>
              <div className="flex items-end justify-between">
                <div className="text-content-tertiary flex items-center gap-1">
                  <Clock size={16} />
                  <h2>Recently picked</h2>
                </div>
                <Button
                  className="rounded-md px-1.5 py-0.5 text-sm"
                  onClick={() => setRecentTokens({})}
                >
                  Clear
                </Button>
              </div>
              <TokenList
                tokens={recentTokens[currentChainId]}
                onTokenClick={handleTokenClick}
              />
            </>
          )}

        {!isSearching && tokensWithoutRecents.length > 0 && (
          <>
            <div className="text-content-tertiary flex items-center gap-1">
              <Coins size={16} />
              <h2>Tokens</h2>
            </div>
            <TokenList
              tokens={tokensWithoutRecents}
              onTokenClick={handleTokenClick}
            />
          </>
        )}

        {!isSearching && tokensWithoutRecents.length === 0 && (
          <p className="text-content-tertiary text-center">
            No tokens found for the{" "}
            <span className="text-content-primary">{chain?.name}</span> network.
          </p>
        )}
      </div>
    </Modal>
  );
};

export { TokenListModal };
