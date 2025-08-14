import type { SignClientTypes } from "@walletconnect/types";
import { createTrackedSelector } from "react-tracked";
import { create } from "zustand";
import type { WalletConnectProposalMetadata } from "@/types/wallet";

interface WalletKitStore {
  isInited: boolean;
  websiteInfo: WalletConnectProposalMetadata | undefined;
  approveProposal:
    | SignClientTypes.EventArguments["session_proposal"]
    | undefined;
  signatureProposal:
    | SignClientTypes.EventArguments["session_request"]
    | undefined;
  signatureTypeDataProposal:
    | SignClientTypes.EventArguments["session_request"]
    | undefined;
  sendTransactionProposal:
    | SignClientTypes.EventArguments["session_request"]
    | undefined;
  errorMessage: string | undefined;
  setIsInited: (isInited: boolean) => void;
  setApproveProposal: (
    proposal: SignClientTypes.EventArguments["session_proposal"] | undefined
  ) => void;
  setSignatureProposal: (
    proposal: SignClientTypes.EventArguments["session_request"] | undefined
  ) => void;
  setSignatureTypeDataProposal: (
    proposal: SignClientTypes.EventArguments["session_request"] | undefined
  ) => void;
  setSendTransactionProposal: (
    proposal: SignClientTypes.EventArguments["session_request"] | undefined
  ) => void;
  setErrorMessage: (message: string) => void;
  setWebsiteInfo: (websiteInfo: WalletConnectProposalMetadata) => void;
}

const store = create<WalletKitStore>((set) => ({
  isInited: false,
  websiteInfo: undefined,
  approveProposal: undefined,
  signatureProposal: undefined,
  signatureTypeDataProposal: undefined,
  sendTransactionProposal: undefined,
  errorMessage: undefined,
  setIsInited: (isInited: boolean) => set({ isInited }),
  setApproveProposal: (
    proposal: SignClientTypes.EventArguments["session_proposal"] | undefined
  ) => set({ approveProposal: proposal }),
  setSignatureProposal: (
    proposal: SignClientTypes.EventArguments["session_request"] | undefined
  ) => set({ signatureProposal: proposal }),
  setSignatureTypeDataProposal: (
    proposal: SignClientTypes.EventArguments["session_request"] | undefined
  ) => set({ signatureTypeDataProposal: proposal }),
  setSendTransactionProposal: (
    proposal: SignClientTypes.EventArguments["session_request"] | undefined
  ) => set({ sendTransactionProposal: proposal }),
  setErrorMessage: (message: string) => set({ errorMessage: message }),
  setWebsiteInfo: (websiteInfo: WalletConnectProposalMetadata) =>
    set({ websiteInfo })
}));

export const setIsInited = (isInited: boolean) => {
  store.getState().setIsInited(isInited);
};
export const useWalletkitStore = createTrackedSelector(store);
