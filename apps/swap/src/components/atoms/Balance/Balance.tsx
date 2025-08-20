import { formatUnits, getAddress, zeroAddress } from "viem";
import { useAccount, useBalance } from "wagmi";

const Balance: React.FC<{
  tokenAddress: string | undefined;
  isJustBalance?: boolean;
}> = ({ tokenAddress, isJustBalance = false }) => {
  const { isConnected, address } = useAccount();
  const { data: balance } = useBalance({
    address,
    token: getAddress(tokenAddress ?? zeroAddress),
  });

  if (!isConnected) {
    return <></>;
  }

  const formattedBalance = balance
    ? formatUnits(balance.value, balance.decimals)
    : 0;

  return (
    <p>
      {isJustBalance ? null : "Balance: "}
      {(+formattedBalance).toFixed(2)}
    </p>
  );
};

export { Balance };
