import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { formatInputNumber } from "src/utility";
import { amountSchema } from "src/schemas";
import { formatUnits, type Hex, parseUnits } from "viem";

const cctpSlice = createSlice({
  name: "cctpSlice",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<(typeof initialState)["step"]>) => {
      state.step = action.payload;
    },
    setPersistedData: (_, action: PayloadAction<typeof initialState>) =>
      action.payload,
    reset: (state) => {
      return {
        ...initialState,
        sourceChainId: state.sourceChainId,
        destinationChainId: state.destinationChainId,
      };
    },
    setSourceChainId: (
      state,
      action: PayloadAction<{ chainId: (typeof initialState)["sourceChainId"] }>
    ) => {
      if (action.payload.chainId === state.destinationChainId) {
        const temp = state.sourceChainId;
        state.sourceChainId = state.destinationChainId;
        state.destinationChainId = temp;

        return;
      }

      state.sourceChainId = action.payload.chainId;
    },
    setDestinationChainId: (
      state,
      action: PayloadAction<{
        chainId: (typeof initialState)["destinationChainId"];
      }>
    ) => {
      if (action.payload.chainId === state.sourceChainId) {
        const temp = state.destinationChainId;
        state.destinationChainId = state.sourceChainId;
        state.sourceChainId = temp;

        return;
      }
      state.destinationChainId = action.payload.chainId;
    },
    toggleChains: (state) => {
      const temp = state.sourceChainId;
      state.sourceChainId = state.destinationChainId;
      state.destinationChainId = temp;
    },

    setTokenAmount: (
      state,
      action: PayloadAction<{
        inputString: string;
        tokenDecimals: number;
      }>
    ) => {
      const inputString = formatInputNumber(action.payload.inputString);
      const amount = amountSchema.safeParse(inputString);
      if (amount.success) {
        state.tokenAmount = {
          amountWei: parseUnits(
            amount.data.toString(),
            action.payload.tokenDecimals
          ).toString(),
          inputString,
          isValid: true,
          value: amount.data,
        };
      } else {
        state.tokenAmount = {
          isValid: false,
          inputString,
        };
      }
    },
    setTokenAmountWei: (
      state,
      action: PayloadAction<{
        amountWei: string;
        tokenDecimals: number;
      }>
    ) => {
      const value = +formatUnits(
        BigInt(action.payload.amountWei),
        action.payload.tokenDecimals
      );

      state.tokenAmount = {
        amountWei: action.payload.amountWei,
        inputString: value.toString(),
        isValid: true,
        value,
      };
    },
    changeTransferType: (state) => {
      if (state.transferType === "fast") {
        state.transferType = "standard";
      } else if (state.transferType === "standard") {
        state.transferType = "fast";
      }
    },
    setBurnTxHash: (state, action: PayloadAction<Hex>) => {
      state.burnTxHash = action.payload;
    },
    setAttestation: (
      state,
      action: PayloadAction<{
        attestation: Hex;
        message: Hex;
      }>
    ) => {
      state.attestation = action.payload.attestation;
      state.message = action.payload.message;
    },
  },
});

export { cctpSlice };
