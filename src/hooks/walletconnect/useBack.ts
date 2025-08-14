import { useCallback } from "react";
import { useWalletkitStore } from "@/store/walletkit";

const useBack = () => {
  const { websiteInfo } = useWalletkitStore();

  const back = useCallback(() => {
    // const isNativeApp = session.peer.metadata.redirect !== undefined;

    if (!websiteInfo?.url) return console.log("Not have websiteInfo");
    if (window.opener) {
      window.opener.location.href = websiteInfo.url;
    }
    window.close();
  }, [websiteInfo]);

  return {
    back
  };
};

export default useBack;
