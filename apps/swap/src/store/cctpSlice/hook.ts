import React from "react";
import { cctpSlice } from "./slice";
import { useAppDispatch, useAppSelector } from "src/hooks";

const useCCTP = () => {
  const cctpSliceState = useAppSelector((state) => state.cctpSlice);
  const dispatch = useAppDispatch();

  const isApprovedEnough = false;

  const setTokenAmount = React.useCallback(
    (...args: Parameters<typeof cctpSlice.actions.setTokenAmount>) => {
      dispatch(cctpSlice.actions.setTokenAmount(...args));
    },
    []
  );

  const setTokenAmountWei = React.useCallback(
    (...args: Parameters<typeof cctpSlice.actions.setTokenAmountWei>) => {
      dispatch(cctpSlice.actions.setTokenAmountWei(...args));
    },
    []
  );

  const setSourceChainId = React.useCallback(
    (...args: Parameters<typeof cctpSlice.actions.setSourceChainId>) => {
      dispatch(cctpSlice.actions.setSourceChainId(...args));
    },
    []
  );

  const setDestinationChainId = React.useCallback(
    (...args: Parameters<typeof cctpSlice.actions.setDestinationChainId>) => {
      dispatch(cctpSlice.actions.setDestinationChainId(...args));
    },
    []
  );

  const toggleChains = React.useCallback(() => {
    dispatch(cctpSlice.actions.toggleChains());
  }, []);

  const reset = React.useCallback(() => {
    dispatch(cctpSlice.actions.reset());
  }, []);

  const changeTransferType = React.useCallback(
    (...args: Parameters<typeof cctpSlice.actions.changeTransferType>) => {
      dispatch(cctpSlice.actions.changeTransferType(...args));
    },
    []
  );

  const setBurnTxHash = React.useCallback(
    (...args: Parameters<typeof cctpSlice.actions.setBurnTxHash>) => {
      dispatch(cctpSlice.actions.setBurnTxHash(...args));
    },
    []
  );

  const setAttestation = React.useCallback(
    (...args: Parameters<typeof cctpSlice.actions.setAttestation>) => {
      dispatch(cctpSlice.actions.setAttestation(...args));
    },
    []
  );

  const setPersistedData = React.useCallback(
    (...args: Parameters<typeof cctpSlice.actions.setPersistedData>) => {
      dispatch(cctpSlice.actions.setPersistedData(...args));
    },
    []
  );

  const setStep = React.useCallback(
    (...args: Parameters<typeof cctpSlice.actions.setStep>) => {
      dispatch(cctpSlice.actions.setStep(...args));
    },
    []
  );

  return {
    ...cctpSliceState,
    setTokenAmount,
    setTokenAmountWei,
    reset,
    setSourceChainId,
    setDestinationChainId,
    toggleChains,
    changeTransferType,
    isApprovedEnough,
    setBurnTxHash,
    setAttestation,
    setPersistedData,
    setStep,
  };
};

export { useCCTP };
