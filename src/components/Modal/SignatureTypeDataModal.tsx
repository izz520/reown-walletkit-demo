import { useEffect, useState } from "react";
import { signTypedData } from "@/contract/account";
import { walletkit } from "@/libs/initWalletKit";
import { useWalletkitStore } from "@/store/walletkit";
import BaseModal from "./Base";

const SignatureTypeDataModal = () => {
  const { signatureTypeDataProposal } = useWalletkitStore();
  console.log("🚀 ~ LoginModal ~ proposal:", signatureTypeDataProposal);
  const id = signatureTypeDataProposal?.id as number;
  const chainId = signatureTypeDataProposal?.params?.chainId as string;
  const message = signatureTypeDataProposal?.params?.request?.params[1];
  const parsedMessage = message ? JSON.parse(message) : "";
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    setOpen(!!signatureTypeDataProposal);
  }, [signatureTypeDataProposal]);

  const handleConfirm = async () => {
    const signature = await signTypedData(chainId, parsedMessage);
    console.log("🚀 ~ handleConfirm ~ signature:", signature);
    const response = { id, result: signature, jsonrpc: "2.0" };
    await walletkit.respondSessionRequest({
      topic: signatureTypeDataProposal?.topic as string,
      response
    });
    const targetUrl = signatureTypeDataProposal?.verifyContext?.verified.origin;
    console.log("🚀 ~ handleReject ~ targetUrl:", targetUrl);
    if (targetUrl) {
      window.location.href = targetUrl;
      window.close();
    }
    console.log("signature success");
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
      topic: signatureTypeDataProposal?.topic as string,
      response
    });
    const targetUrl = signatureTypeDataProposal?.verifyContext?.verified.origin;
    console.log("🚀 ~ handleReject ~ targetUrl:", targetUrl);
    if (targetUrl) {
      window.location.href = targetUrl;
      window.close();
    }
    console.log("signature rejected");
  };
  return (
    <BaseModal
      title="Sign message"
      open={open}
      onClose={() => setOpen(false)}
      onConfirm={handleConfirm}
      onReject={handleReject}
    >
      <div className="flex flex-col gap-2">
        <h3>message:</h3>
        <p>{message}</p>
      </div>
    </BaseModal>
  );
};

export default SignatureTypeDataModal;
