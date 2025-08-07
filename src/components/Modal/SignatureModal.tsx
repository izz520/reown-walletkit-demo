import { useEffect, useState } from "react";
import { signMessage } from "@/contract/account";
import { walletkit } from "@/libs/initWalletKit";
import parseSignature from "@/libs/parseSignature";
import { useWalletkitStore } from "@/store/walletkit";
import BaseModal from "./Base";

const SignatureModal = () => {
  const { signatureProposal } = useWalletkitStore();
  console.log("🚀 ~ LoginModal ~ proposal:", signatureProposal);
  const id = signatureProposal?.id as number;
  const message = signatureProposal?.params?.request?.params[0];
  const parsedMessage = parseSignature(message);
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    setOpen(!!signatureProposal);
  }, [signatureProposal]);

  const handleConfirm = async () => {
    const signature = await signMessage(parsedMessage as string);
    console.log("🚀 ~ handleConfirm ~ signature:", signature);
    const response = { id, result: signature, jsonrpc: "2.0" };
    await walletkit.respondSessionRequest({
      topic: signatureProposal?.topic as string,
      response
    });
    const targetUrl = signatureProposal?.verifyContext?.verified.origin;
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
      topic: signatureProposal?.topic as string,
      response
    });
    const targetUrl = signatureProposal?.verifyContext?.verified.origin;
    console.log("🚀 ~ handleReject ~ targetUrl:", targetUrl);
    if (targetUrl) {
      window.location.href = targetUrl;
      window.close();
    }
    console.log("signature rejected");
  };
  return (
    <BaseModal
      title="Sign Message"
      open={open}
      onClose={() => setOpen(false)}
      onConfirm={handleConfirm}
      onReject={handleReject}
    >
      <div className="flex flex-col gap-2">
        <h3>message:</h3>
        <p>{parsedMessage}</p>
      </div>
    </BaseModal>
  );
};

export default SignatureModal;
