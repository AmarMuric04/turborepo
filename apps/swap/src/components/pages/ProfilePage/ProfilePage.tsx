import { useAccount, useEnsName } from "wagmi";

const ProfilePage = () => {
  const account = useAccount();
  const { data, error, status } = useEnsName({ address: account.address });

  console.log(account);

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
        <p>You&apos;re not connected!</p>
      )}
    </div>
  );
};

export { ProfilePage };
