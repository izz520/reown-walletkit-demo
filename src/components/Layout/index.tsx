import { RELAYER_EVENTS } from "@walletconnect/core";
import { useEffect } from "react";
import { Outlet } from "react-router";
import useInitialization from "@/hooks/useInitialization";
import useWalletConnectEventsManager from "@/hooks/useWalletConnectEventsManager";
import { walletkit } from "@/libs/initWalletKit";
import LoginModal from "../Modal/LoginModal";
import SignatureModal from "../Modal/SignatureModal";
import SignatureTypeDataModal from "../Modal/SignatureTypeDataModal";

const Layout = () => {
  // useWallet();
  // Step 1 - Initialize wallets and wallet connect client
  const initialized = useInitialization();

  // Step 2 - Once initialized, set up wallet connect event manager
  useWalletConnectEventsManager(initialized);
  useEffect(() => {
    if (!initialized) return;
    walletkit?.core.relayer.on(RELAYER_EVENTS.connect, () => {
      console.log("Network connection is restored!");

      // styledToast('Network connection is restored!', 'success')
    });

    walletkit?.core.relayer.on(RELAYER_EVENTS.disconnect, () => {
      console.log("Network connection lost.");
      // styledToast('Network connection lost.', 'error')
    });
  }, [initialized]);
  return (
    <>
      <Outlet />
      <LoginModal />
      <SignatureModal />
      <SignatureTypeDataModal />
    </>
  );
};

export default Layout;
