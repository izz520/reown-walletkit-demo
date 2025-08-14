import type { SignClientTypes } from "@walletconnect/types";
import { useCallback, useEffect } from "react";
import { hexToString } from "viem";
import { walletkit } from "@/libs/initWalletKit";
import { useWalletkitStore } from "@/store/walletkit";

export default function useWalletConnectEventsManager(initialized: boolean) {
  const {
    setApproveProposal,
    setSignatureProposal,
    setSignatureTypeDataProposal,
    setSendTransactionProposal,
    setWebsiteInfo,
    setErrorMessage
  } = useWalletkitStore();
  /******************************************************************************
   * 1. Open session proposal modal for confirmation / rejection
   *****************************************************************************/
  const onSessionProposal = useCallback(
    (proposal: SignClientTypes.EventArguments["session_proposal"]) => {
      console.log("EventManager onSessionProposal", proposal);
      const websiteInfo = proposal.params.proposer.metadata;
      setApproveProposal(proposal);
      setWebsiteInfo(websiteInfo);
      // set the verify context so it can be displayed in the projectInfoCard
      // SettingsStore.setCurrentRequestVerifyContext(proposal.verifyContext);
      // ModalStore.open("SessionProposalModal", { proposal });
    },
    [setApproveProposal]
  );

  /******************************************************************************
   * 3. Open request handling modal based on method that was used
   *****************************************************************************/
  const onSessionRequest = useCallback(
    async (requestEvent: SignClientTypes.EventArguments["session_request"]) => {
      try {
        console.log("EventManager onSessionRequest", requestEvent);
        const { topic, params } = requestEvent;
        const { request } = params;
        const { expiryTimestamp } = request;
        if (expiryTimestamp && verifySessionExpired(expiryTimestamp)) {
          console.log("session expired");
          setErrorMessage("Session expired");
          return;
        }
        const requestSession =
          walletkit?.engine?.signClient?.session?.get(topic);
        const websiteInfo = requestSession?.peer?.metadata;
        setWebsiteInfo(websiteInfo);
        // console.log("session_request", requestEvent);
        const { method } = request;
        if (method === "personal_sign") {
          const requestParamsMessage = request.params[0];
          const message = hexToString(requestParamsMessage);
          setSignatureProposal(requestEvent);
          console.log("personal_sign", message);
        }
        if (method === "eth_signTypedData_v4") {
          const requestParamsMessage = request.params[1];
          console.log("requestParamsMessage", JSON.parse(requestParamsMessage));
          setSignatureTypeDataProposal(requestEvent);
        }
        if (method === "eth_sendTransaction") {
          const transaction = request.params[0];
          console.log("transaction", transaction);
          setSendTransactionProposal(requestEvent);
        }
      } catch (err: any) {
        console.log("onSessionRequest Error", err);
        // setErrorMessage(err.message)
        setSignatureProposal(undefined);
        setSignatureTypeDataProposal(undefined);
        setSendTransactionProposal(undefined);
      }
    },
    [
      setSignatureProposal,
      setSignatureTypeDataProposal,
      setSendTransactionProposal
    ]
  );

  const onSessionAuthenticate = useCallback(
    (authRequest: SignClientTypes.EventArguments["session_authenticate"]) => {
      console.log("session_authenticate", authRequest);

      // ModalStore.open("SessionAuthenticateModal", { authRequest });
    },
    []
  );

  const verifySessionExpired = useCallback((timestamp: number) => {
    //timestamp 是秒的时间戳
    //检查时间戳是否过期
    const currentTime = Math.floor(Date.now() / 1000);
    if (currentTime > timestamp) {
      console.log("session expired");
      return true;
    } else {
      return false;
    }
  }, []);

  /******************************************************************************
   * Set up WalletConnect event listeners
   *****************************************************************************/
  useEffect(() => {
    if (initialized && walletkit) {
      // 注册事件监听器
      walletkit.on("session_proposal", onSessionProposal);
      walletkit.on("session_request", onSessionRequest);
      walletkit.on("session_authenticate", onSessionAuthenticate);
      walletkit.on("proposal_expire", () => {
        console.log("proposal_expire");
      });
      walletkit.on("session_request_expire", () => {
        console.log("session_request_expire");
      });
      // 其他事件监听器
      walletkit.engine.signClient.events.on("session_ping", (data: any) =>
        console.log("ping", data)
      );
      walletkit.on("session_delete", (data: any) => {
        console.log("session_delete event received", data);
      });
      console.log("📡 Registering WalletConnect event listeners");
      // 清理函数
      return () => {
        console.log("🧹 Cleaning up WalletConnect event listeners");
        walletkit.off("session_proposal", onSessionProposal);
        walletkit.off("session_request", onSessionRequest);
        walletkit.off("session_authenticate", onSessionAuthenticate);
      };
    }
  }, [initialized, onSessionAuthenticate, onSessionProposal, onSessionRequest]);
}
