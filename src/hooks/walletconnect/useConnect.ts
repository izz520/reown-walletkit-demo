// import { useUserInfo } from '@matchain/matchid-sdk-react/hooks';
import { buildApprovedNamespaces, getSdkError } from "@walletconnect/utils";
import { useState } from "react";
import { account } from "@/contract/account";
import { supportedChainId } from "@/contract/chain";
import { walletkit } from "@/libs/initWalletKit";
import { useWalletkitStore } from "@/store/walletkit";
import useBack from "./useBack";

const useConnect = () => {
  // const { address } = useUserInfo()
  const { approveProposal } = useWalletkitStore();
  const { back } = useBack();
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [connectSuccess, setConnectSuccess] = useState<boolean>(false);
  const handleConfirm = async () => {
    try {
      setConfirmLoading(true);
      setConnectSuccess(false);
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
      setConnectSuccess(true);
    } catch (err) {
      console.log("connect error", err);
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleReject = async () => {
    try {
      await walletkit.rejectSession({
        id: approveProposal?.id as number,
        reason: getSdkError("USER_REJECTED")
      });
      back();
    } catch (err) {
      console.log("connect reject error", err);
    }
  };

  return {
    handleConfirm,
    handleReject,
    confirmLoading,
    connectSuccess
  };
};

export default useConnect;
