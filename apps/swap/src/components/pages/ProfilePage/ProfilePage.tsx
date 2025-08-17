import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useAccount,
  useBalance,
  useBlockNumber,
  useChainId,
  useConfig,
  useEnsName,
} from "wagmi";
import { getBlockQueryOptions } from "wagmi/query";
import { Link } from "@tanstack/react-router";
// import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Account, SendTransaction, WalletOptions } from "components/molecules";
import { ReadContract } from "components/molecules/ReadContract";
import { MintNFT } from "components/molecules/MintNFT";

const ProfilePage = () => {
  const account = useAccount();
  const { data, error, status } = useEnsName({ address: account.address });
  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { data: balance, queryKey } = useBalance();
  const chainId = useChainId();
  const config = useConfig();

  React.useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [blockNumber]);

  const prefetch = () =>
    queryClient.prefetchQuery(getBlockQueryOptions(config, { chainId }));

  return (
    <div>
      <p>
        {!account.isConnected ? null : status === "pending" ? (
          <div>Loading ENS name</div>
        ) : status === "error" ? (
          <div>Error fetching ENS name: {error.message}</div>
        ) : (
          <div>ENS name: {data}</div>
        )}
      </p>
      {account.isConnected ? (
        <>
          <p>Your address: {account.address}</p>
          <p>Connected on {account?.connector?.name ?? "Unknown"}</p>
        </>
      ) : (
        <div>
          <p>You&apos;re not connected!</p>
          <WalletOptions />
          {/* <ConnectButton /> */}
        </div>
      )}
      <p>{balance?.value}</p>
      <button
        onClick={async () => {
          await queryClient.invalidateQueries({ queryKey });
        }}
      >
        Invalidate
      </button>
      <Example />
      <Link onMouseEnter={prefetch} onFocus={prefetch} to="/dashboard">
        Block details
      </Link>
      <Account />
      <SendTransaction />
      <ReadContract address={account.address} />
      <MintNFT />
    </div>
  );
};

export { ProfilePage };

const Example = () => {
  const { data: balance } = useBalance();

  return <div>{balance?.value}</div>;
};
