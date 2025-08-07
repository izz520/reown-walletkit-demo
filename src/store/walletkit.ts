import type { SignClientTypes } from "@walletconnect/types";
import { createTrackedSelector } from "react-tracked";
import { create } from "zustand";

interface WalletKitStore {
  isInited: boolean;
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
  setIsInited: (isInited: boolean) => void;
  setApproveProposal: (
    proposal: SignClientTypes.EventArguments["session_proposal"]
  ) => void;
  setSignatureProposal: (
    proposal: SignClientTypes.EventArguments["session_request"]
  ) => void;
  setSignatureTypeDataProposal: (
    proposal: SignClientTypes.EventArguments["session_request"]
  ) => void;
  setSendTransactionProposal: (
    proposal: SignClientTypes.EventArguments["session_request"]
  ) => void;
}

const store = create<WalletKitStore>((set) => ({
  isInited: false,
  approveProposal: undefined,
  signatureProposal: undefined,
  signatureTypeDataProposal: undefined,
  sendTransactionProposal: undefined,
  setIsInited: (isInited: boolean) => set({ isInited }),
  setApproveProposal: (
    proposal: SignClientTypes.EventArguments["session_proposal"]
  ) => set({ approveProposal: proposal }),
  setSignatureProposal: (
    proposal: SignClientTypes.EventArguments["session_request"]
  ) => set({ signatureProposal: proposal }),
  setSignatureTypeDataProposal: (
    proposal: SignClientTypes.EventArguments["session_request"]
  ) => set({ signatureTypeDataProposal: proposal }),
  setSendTransactionProposal: (
    proposal: SignClientTypes.EventArguments["session_request"]
  ) => set({ sendTransactionProposal: proposal })
}));

export const setIsInited = (isInited: boolean) => {
  store.getState().setIsInited(isInited);
};
export const useWalletkitStore = createTrackedSelector(store);
