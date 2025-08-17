export const wagmiContractConfig = {
  address: "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
  abi: [
    {
      type: "function",
      name: "balanceOf",
      stateMutability: "view",
      inputs: [{ name: "account", type: "address" }],
      outputs: [{ type: "uint256" }],
    },
    {
      type: "function",
      name: "ownerOf",
      stateMutability: "view",
      inputs: [{ type: "uint256" }],
      outputs: [{ type: "address" }],
    },
    {
      type: "function",
      name: "totalSupply",
      stateMutability: "view",
      inputs: [],
      outputs: [{ name: "supply", type: "uint256" }],
    },
  ],
} as const;

export const abi = [
  {
    name: "mint",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    outputs: [],
  },
] as const;
