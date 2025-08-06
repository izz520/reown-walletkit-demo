import type { SignClientTypes } from "@walletconnect/types";
import { useCallback, useEffect } from "react";
import { hexToString } from "viem";
import { walletkit } from "@/libs/initWalletKit";
import { useWalletkitStore } from "@/store/walletkit";

export default function useWalletConnectEventsManager(initialized: boolean) {
  const { setApproveProposal, setSignatureProposal } = useWalletkitStore();
  /******************************************************************************
   * 1. Open session proposal modal for confirmation / rejection
   *****************************************************************************/
  const onSessionProposal = useCallback(
    (proposal: SignClientTypes.EventArguments["session_proposal"]) => {
      console.log("session_proposal", proposal);
      setApproveProposal(proposal);
      // set the verify context so it can be displayed in the projectInfoCard
      // SettingsStore.setCurrentRequestVerifyContext(proposal.verifyContext);
      // ModalStore.open("SessionProposalModal", { proposal });
    },
    []
  );

  /******************************************************************************
   * 3. Open request handling modal based on method that was used
   *****************************************************************************/
  const onSessionRequest = useCallback(
    async (requestEvent: SignClientTypes.EventArguments["session_request"]) => {
      // const { topic, params, verifyContext, id } = requestEvent
      // const { request } = params
      // const requestSession = walletkit.engine.signClient.session.get(topic)
      console.log("session_request", requestEvent);
      const { params } = requestEvent;
      const { request } = params;
      const { method } = request;
      if (method === "personal_sign") {
        const requestParamsMessage = request.params[0];
        const message = hexToString(requestParamsMessage);
        setSignatureProposal(requestEvent);
        console.log("personal_sign", message);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onSessionAuthenticate = useCallback(
    (authRequest: SignClientTypes.EventArguments["session_authenticate"]) => {
      console.log("session_authenticate", authRequest);

      // ModalStore.open("SessionAuthenticateModal", { authRequest });
    },
    []
  );

  /******************************************************************************
   * Set up WalletConnect event listeners
   *****************************************************************************/
  useEffect(() => {
    if (initialized && walletkit) {
      //sign
      walletkit.on("session_proposal", onSessionProposal);
      walletkit.on("session_request", onSessionRequest);
      // TODOs
      walletkit.engine.signClient.events.on("session_ping", (data: any) =>
        console.log("ping", data)
      );
      walletkit.on("session_delete", (data: any) => {
        console.log("session_delete event received", data);
        // refreshSessionsList();
      });
      walletkit.on("session_authenticate", onSessionAuthenticate);
      // load sessions on init
      // refreshSessionsList();
    }
  }, [initialized, onSessionAuthenticate, onSessionProposal, onSessionRequest]);
}
