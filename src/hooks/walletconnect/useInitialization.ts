import { RELAYER_EVENTS } from "@walletconnect/core";
import { useCallback, useEffect, useRef } from "react";
import { createWalletKit, walletkit } from "@/libs/initWalletKit";
import { useWalletkitStore } from "@/store/walletkit";
import useWalletConnectEventsManager from "./useEventsManager";

const relayUrl = process.env.REACT_APP_RELAY_URL || "";
let startedInit = false;
export default function useInitialization() {
  const { isInited, setIsInited } = useWalletkitStore();
  useWalletConnectEventsManager(isInited);
  const prevRelayerURLValue = useRef<string>("");

  const onInitialize = useCallback(async () => {
    if (startedInit) return;
    startedInit = true;
    try {
      const res = await createWalletKit();
      // console.log("🚀 ~ useInitialization ~ res:", res)
      setIsInited(res);
    } catch (err: unknown) {
      console.error("Initialization failed", err);
      alert(err);
    } finally {
      startedInit = false;
    }
  }, []);

  // restart transport if relayer region changes
  const onRelayerRegionChange = useCallback(() => {
    try {
      walletkit?.core?.relayer.restartTransport(relayUrl);
      prevRelayerURLValue.current = relayUrl;
    } catch (err: unknown) {
      alert(err);
    }
  }, []);

  useEffect(() => {
    if (isInited) {
      walletkit?.core.relayer.on(RELAYER_EVENTS.connect, () => {
        console.log("Network connection is restored!");
        // styledToast('Network connection is restored!', 'success')
      });

      walletkit?.core.relayer.on(RELAYER_EVENTS.disconnect, () => {
        console.log("Network connection lost.");
        // styledToast('Network connection lost.', 'error')
      });
    } else {
      onInitialize();
    }

    if (prevRelayerURLValue.current !== relayUrl) {
      onRelayerRegionChange();
    }
  }, [isInited, onInitialize, onRelayerRegionChange]);

  return isInited;
}
