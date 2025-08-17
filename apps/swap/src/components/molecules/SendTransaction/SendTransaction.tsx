import * as React from "react";
import type { Address } from "viem";
import {
  BaseError,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseEther } from "viem";

export const SendTransaction = () => {
  const {
    data: hash,
    isPending,
    error,
    sendTransaction,
  } = useSendTransaction();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const to = formData.get("address") as Address;
    const value = formData.get("value") as string;

    sendTransaction({ to, value: parseEther(value) });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return (
    <form onSubmit={submit}>
      <input name="address" placeholder="0xA0Cf…251e" required />
      <input name="value" placeholder="0.05" required />
      <button disabled={isPending} type="submit">
        {isPending ? "Confirming..." : "Send"}
      </button>
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>}
      {isConfirmed && <div>Transaction confirmed.</div>}
      {error && (
        <div>
          Error:{" "}
          {error instanceof BaseError ? error.shortMessage : error.message}
        </div>
      )}
    </form>
  );
};
