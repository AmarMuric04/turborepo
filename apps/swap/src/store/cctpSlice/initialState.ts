import type { useChains } from "src/hooks";
import type { tokenSchema } from "src/schemas";
import type { Hex } from "viem";
import type z from "zod";

const initialState: {
  sourceChainId: ReturnType<typeof useChains>[number]["id"];
  destinationChainId: ReturnType<typeof useChains>[number]["id"];
  tokenAmount: z.infer<typeof tokenSchema>;
  transferType: "fast" | "standard";
  burnTxHash: Hex | null;
  attestation: Hex | null;
  message: Hex | null;
  step: "approval" | "burn" | "attestation" | "mint" | "unitialized";
} = {
  sourceChainId: 1,
  destinationChainId: 10,
  tokenAmount: {
    inputString: "",
    isValid: false,
  },
  transferType: "fast",
  burnTxHash: null,
  attestation: null,
  message: null,
  step: "unitialized",
};

export { initialState };
