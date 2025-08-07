import { formatJsonRpcResult } from "@walletconnect/jsonrpc-utils";
import { getSdkError } from "@walletconnect/utils";
import { useEffect, useState } from "react";
import { sendTransaction } from "@/contract/account";
import backTab from "@/libs/backTab";
import { walletkit } from "@/libs/initWalletKit";
import { useWalletkitStore } from "@/store/walletkit";
import BaseModal from "./Base";

const SendTransactionModal = () => {
  const { sendTransactionProposal } = useWalletkitStore();
  console.log("🚀 ~ SendTransactionModal ~ proposal:", sendTransactionProposal);
  const sendInfo = sendTransactionProposal?.params?.request?.params[0];
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    setOpen(!!sendTransactionProposal);
  }, [sendTransactionProposal]);

  const handleConfirm = async () => {
    const chainId = sendTransactionProposal?.params?.chainId as string;
    const sendInfo = sendTransactionProposal?.params?.request?.params[0];
    const tx = await sendTransaction(chainId, sendInfo);
    console.log("🚀 ~ handleConfirm ~ tx:", tx);
    const response = formatJsonRpcResult(
      sendTransactionProposal?.id as number,
      tx
    );
    console.log("🚀 ~ handleConfirm ~ response:", response);
    await walletkit.respondSessionRequest({
      topic: sendTransactionProposal?.topic as string,
      response
    });
    console.log("send transaction success");
    const targetUrl = sendTransactionProposal?.verifyContext?.verified.origin;
    backTab(targetUrl);
  };

  const handleReject = async () => {
    await walletkit.rejectSession({
      id: sendTransactionProposal?.id as number,
      reason: getSdkError("USER_REJECTED")
    });
    console.log("rejected");
    const targetUrl = sendTransactionProposal?.verifyContext?.verified.origin;
    backTab(targetUrl);
  };
  return (
    <BaseModal
      title="Send Transaction"
      open={open}
      onClose={() => setOpen(false)}
      onConfirm={handleConfirm}
      onReject={handleReject}
    >
      <div>
        <p>{JSON.stringify(sendInfo)}</p>
      </div>
    </BaseModal>
  );
};

export default SendTransactionModal;
