import { useCallback, useEffect, useRef, useState } from "react";
import { createWalletKit, walletkit } from "@/libs/initWalletKit";

// guard against multiple calls to createWalletKit while the wallet is initializing
let startedInit = false;
export default function useInitialization() {
  const [initialized, setInitialized] = useState(false);
  const prevRelayerURLValue = useRef<string>("");

  const onInitialize = useCallback(async () => {
    if (startedInit) return;

    startedInit = true;
    try {
      await createWalletKit();
      setInitialized(true);
    } catch (err: unknown) {
      console.error("Initialization failed", err);
      alert(err);
    } finally {
      startedInit = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // restart transport if relayer region changes
  const onRelayerRegionChange = useCallback(() => {
    try {
      walletkit?.core?.relayer.restartTransport(import.meta.env.VITE_RELAY_URL);
      prevRelayerURLValue.current = import.meta.env.VITE_RELAY_URL;
    } catch (err: unknown) {
      alert(err);
    }
  }, []);

  useEffect(() => {
    if (!initialized) {
      onInitialize();
    }
    if (prevRelayerURLValue.current !== import.meta.env.VITE_RELAY_URL) {
      onRelayerRegionChange();
    }
  }, [initialized, onInitialize, onRelayerRegionChange]);

  return initialized;
}
