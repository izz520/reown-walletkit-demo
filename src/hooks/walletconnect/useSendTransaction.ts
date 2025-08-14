import { formatJsonRpcResult } from "@walletconnect/jsonrpc-utils";
import { getSdkError } from "@walletconnect/utils";
import { useMemo, useRef, useState } from "react";
import { createPublicClient, defineChain, http } from "viem";
import { sendTransaction } from "@/contract/account";
import { supportedChains } from "@/contract/chain";
import { walletkit } from "@/libs/initWalletKit";
import { useWalletkitStore } from "@/store/walletkit";
import useBack from "./useBack";

const useSendTransaction = () => {
  const { sendTransactionProposal } = useWalletkitStore();
  // const { createWalletClient } = useWallet()
  const { back } = useBack();
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [confirmSuccess, setConfirmSuccess] = useState<boolean>(false);
  const hash = useRef<string | null>(null);
  const chain = useMemo(() => {
    const chainId = sendTransactionProposal?.params?.chainId;
    if (!chainId) return null;
    return supportedChains[chainId as keyof typeof supportedChains];
  }, [sendTransactionProposal]);
  const publicClient = useMemo(() => {
    return createPublicClient({
      chain: defineChain(chain?.config as any) as any,
      transport: http()
    });
  }, [chain]);
  // console.log("🚀 ~ useSendTransaction ~ walletClient:", walletClient)

  const handleConfirm = async () => {
    try {
      setConfirmLoading(true);
      setConfirmSuccess(false);
      const chainId = sendTransactionProposal?.params?.chainId as string;
      const sendInfo = sendTransactionProposal?.params?.request?.params[0];
      const tx = await sendTransaction(chainId, sendInfo);
      console.log("🚀 ~ handleConfirm ~ tx:", tx);
      if (!tx) {
        throw new Error("Transaction hash is null");
      }
      const receipt = await publicClient.waitForTransactionReceipt({
        hash: tx as `0x${string}`
      });
      if (receipt.status === "success") {
        console.log("Transaction success");
      }
      if (receipt.status === "reverted") {
        throw new Error("Transaction reverted");
      }
      console.log("🚀 ~ handleConfirm ~ tx:", tx);
      const response = formatJsonRpcResult(
        sendTransactionProposal?.id as number,
        tx
      );
      console.log("🚀 ~ handleConfirm ~ response:", response);
      hash.current = tx;
      setConfirmSuccess(true);
    } catch (err: any) {
      console.log("🚀 useSendTransaction ~ handleConfirm ~ err:", err);
      setConfirmSuccess(false);
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleReject = async () => {
    await walletkit.rejectSession({
      id: sendTransactionProposal?.id as number,
      reason: getSdkError("USER_REJECTED")
    });
    console.log("rejected");
    back();
  };

  return {
    confirmLoading,
    confirmSuccess,
    hash: hash.current,
    handleConfirm,
    handleReject
  };
};

export default useSendTransaction;
