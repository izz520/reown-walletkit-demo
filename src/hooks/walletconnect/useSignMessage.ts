// import { useWallet } from '@matchain/matchid-sdk-react/hooks';
import { useState } from "react";
import { hexToString } from "viem";
import { signMessage } from "@/contract/account";
import { walletkit } from "@/libs/initWalletKit";
import { useWalletkitStore } from "@/store/walletkit";
import useBack from "./useBack";

const useSignMessage = () => {
  const { back } = useBack();
  const { signatureProposal } = useWalletkitStore();
  const [signature, setSignature] = useState<string>("");
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [confirmSuccess, setConfirmSuccess] = useState<boolean>(false);
  const id = signatureProposal?.id as number;
  const message = signatureProposal?.params?.request?.params[0];
  const parsedMessage = hexToString(message);
  const handleConfirm = async () => {
    try {
      setConfirmLoading(true);
      setConfirmSuccess(false);
      const signature = await signMessage(parsedMessage);
      setSignature(signature);
      console.log("🚀 ~ handleConfirm ~ signature:", signature);
      const response = { id, result: signature, jsonrpc: "2.0" };
      await walletkit.respondSessionRequest({
        topic: signatureProposal?.topic as string,
        response
      });
      setConfirmSuccess(true);
      console.log("signature success");
    } catch (err: any) {
      console.log("🚀 ~useSignMessage ~ handleConfirm ~ err:", err);
      setConfirmSuccess(false);
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleReject = async () => {
    const response = {
      id,
      jsonrpc: "2.0",
      error: {
        code: 5000,
        message: "User rejected."
      }
    };
    await walletkit.respondSessionRequest({
      topic: signatureProposal?.topic as string,
      response
    });
    back();
    console.log("signature rejected");
  };

  return {
    signature,
    parsedMessage,
    confirmLoading,
    confirmSuccess,
    handleConfirm,
    handleReject
  };
};

export default useSignMessage;
