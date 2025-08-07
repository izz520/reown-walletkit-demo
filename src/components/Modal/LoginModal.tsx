import { buildApprovedNamespaces, getSdkError } from "@walletconnect/utils";
import { useEffect, useState } from "react";
import { account } from "@/contract/account";
import { supportedChainId } from "@/contract/chain";
import { walletkit } from "@/libs/initWalletKit";
import { useWalletkitStore } from "@/store/walletkit";
import BaseModal from "./Base";

const LoginModal = () => {
  const { approveProposal } = useWalletkitStore();
  console.log("🚀 ~ LoginModal ~ proposal:", approveProposal);
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    setOpen(!!approveProposal);
  }, [approveProposal]);

  const handleConfirm = async () => {
    const accounts = supportedChainId.map(
      (chain) => `${chain}:${account.address}`
    );

    const approvedNamespaces = buildApprovedNamespaces({
      proposal: approveProposal?.params as any,
      supportedNamespaces: {
        eip155: {
          chains: supportedChainId,
          methods: [
            "eth_sendTransaction",
            "personal_sign",
            "wallet_switchEthereumChain",
            "eth_signTypedData_v4"
          ],
          events: [
            "chainChanged",
            "accountsChanged",
            "message",
            "disconnect",
            "connect"
          ],
          accounts: accounts
        }
      }
    });

    await walletkit.approveSession({
      id: approveProposal?.id as number,
      namespaces: approvedNamespaces
    });
    console.log("login success", window.opener);
    const targetUrl = approveProposal?.params?.proposer?.metadata.url;
    console.log("🚀 ~ handleConfirm ~ targetUrl:", targetUrl);
    if (targetUrl) {
      window.location.href = targetUrl;
      window.close();
    }
  };

  const handleReject = async () => {
    await walletkit.rejectSession({
      id: approveProposal?.id as number,
      reason: getSdkError("USER_REJECTED")
    });
    console.log("login rejected");
    console.log("window.opener", window.opener);
    const targetUrl = approveProposal?.params?.proposer?.metadata.url;
    console.log("🚀 ~ handleReject ~ targetUrl:", targetUrl);
    if (targetUrl) {
      window.location.href = targetUrl;
      window.close();
    }
  };
  return (
    <BaseModal
      title="Login To Your Account"
      open={open}
      onClose={() => setOpen(false)}
      onConfirm={handleConfirm}
      onReject={handleReject}
    >
      <div>
        <p>{account.address}</p>
      </div>
    </BaseModal>
  );
};

export default LoginModal;
