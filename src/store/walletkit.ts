import { createTrackedSelector } from "react-tracked";
import { create } from "zustand";

interface WalletKitStore {
  isInited: boolean;
  setIsInited: (isInited: boolean) => void;
}

const store = create<WalletKitStore>((set) => ({
  isInited: false,
  setIsInited: (isInited: boolean) => set({ isInited })
}));

export const setIsInited = (isInited: boolean) => {
  store.getState().setIsInited(isInited);
};
export const useWalletkitStore = createTrackedSelector(store);
