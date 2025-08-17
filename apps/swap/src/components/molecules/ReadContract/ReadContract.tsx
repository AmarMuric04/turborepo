import React from "react";
import { wagmiContractConfig } from "src/constants";
import { BaseError, type Address } from "viem";
import { useBlockNumber, useReadContracts } from "wagmi";

const ReadContract = ({
  address = "0x03A71968491d55603FFe1b11A9e23eF013f75bCF",
}: {
  address: Address | undefined;
}) => {
  // const {
  //   data: balance,
  //   error,
  //   isPending,
  //   refetch,
  // } = useReadContract({
  //   ...wagmiContractConfig,
  //   functionName: "balanceOf",
  //   args: [address ?? zeroAddress],
  //   query: {
  //     enabled: !!address,
  //   },
  // });

  const { data: blockNumber } = useBlockNumber({ watch: true });

  const {
    data,
    error: contractsError,
    isPending: contractsIsPending,
    refetch,
  } = useReadContracts({
    contracts: [
      {
        ...wagmiContractConfig,
        functionName: "balanceOf",
        args: [address],
      },
      {
        ...wagmiContractConfig,
        functionName: "totalSupply",
      },
    ],
  });

  const [balance, totalSupply] = data || [];

  React.useEffect(() => {
    refetch();
  }, [blockNumber]);

  // if (isPending) return <div>Loading...</div>;

  // if (error)
  //   return (
  //     <div>
  //       Error: {error instanceof BaseError ? error.shortMessage : error.message}
  //     </div>
  //   );

  if (contractsIsPending) return <div>Loading...</div>;

  if (contractsError)
    return (
      <div>
        Error:{" "}
        {contractsError instanceof BaseError
          ? contractsError.shortMessage
          : contractsError.message}
      </div>
    );

  return (
    <div>
      <div>Balance: {balance?.result?.toString()}</div>
      <div>Total Supply: {totalSupply?.result?.toString()}</div>
    </div>
  );
};

export { ReadContract };
