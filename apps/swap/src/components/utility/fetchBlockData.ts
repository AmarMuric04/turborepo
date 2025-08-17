import { config } from "wagmi.config";
import { queryClient } from "src/main";
import { getBlockQueryOptions } from "wagmi/query";
// import type { Block } from "viem";
// import { parseEther } from "viem";
// import { useSimulateContract } from "wagmi";
// import { celo } from "viem/chains";

export const fetchBlockData = async () => {
  return queryClient.fetchQuery(
    getBlockQueryOptions(config, {
      chainId: config.state.chainId,
    })
  );
};

// export const getPendingBlockData = () => {
//   return queryClient.getQueryData(
//     getBlockQueryOptions(config, {
//       chainId: config.state.chainId,
//       tag: "pending",
//     })
//   );
// };

// export const setPendingBlockData = (data: Block) => {
//   return queryClient.setQueryData(
//     getBlockQueryOptions(
//       config,
//       {
//         chainId: config.state.chainId,
//         tag: "pending",
//       },
//       data
//     )
//   );
// };

// export const result = useSimulateContract({
//   to: "0xd2135CfB216b74109775236E36d4b433F1DF507B",
//   value: parseEther("0.01"),
//   chainId: celo.id,
//   feeCurrency: "0x…",
// });
