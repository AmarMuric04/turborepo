import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { erc20Abi, maxUint256 } from "viem";
import React from "react";

type UseTokenApprovalProps = {
  token: `0x${string}`;
  spender: `0x${string}`;
  amount: bigint;
};

export const useTokenApproval = ({
  token,
  spender,
  amount,
}: UseTokenApprovalProps) => {
  const { address } = useAccount();
  const { data: allowance, refetch } = useReadContract({
    address: token,
    abi: erc20Abi,
    functionName: "allowance",
    args: [address!, spender],
    query: { enabled: !!address },
  });

  const { writeContract, isPending } = useWriteContract();

  const isApproved = allowance !== undefined && allowance >= amount;

  const approve = React.useCallback(async () => {
    const tx = writeContract({
      address: token,
      abi: erc20Abi,
      functionName: "approve",
      args: [spender, maxUint256],
    });

    refetch();

    return tx;
  }, [token, spender, JSON.stringify(writeContract), JSON.stringify(refetch)]);

  return {
    allowance,
    isApproved,
    approve,
    isApproving: isPending,
  };
};
