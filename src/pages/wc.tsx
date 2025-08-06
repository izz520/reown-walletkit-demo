import { parseUri } from "@walletconnect/utils";
import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { walletkit } from "@/libs/initWalletKit";
import { useWalletkitStore } from "@/store/walletkit";

const Wc = () => {
  // const [searchParams] = useSearchParams();
  const { isInited } = useWalletkitStore();
  const [searchParams] = useSearchParams();

  const _pairWithUri = async (uri: string | null) => {
    if (uri && walletkit) {
      console.log("🚀 ~ useEffect ~ uri:", uri);
      walletkit.pair({ uri });
      console.log("connect pair");
    }
  };

  async function onConnect(uri: string) {
    const { topic: pairingTopic } = parseUri(uri);
    console.log("🚀 ~ onConnect ~ pairingTopic:", pairingTopic);
    // if for some reason, the proposal is not received, we need to close the modal when the pairing expires (5mins)
    const pairingExpiredListener = ({ topic }: { topic: string }) => {
      if (pairingTopic === topic) {
        console.log(
          "😈😈 Pairing expired. Please try again with new Connection URI"
        );
        walletkit.core.pairing.events.removeListener(
          "pairing_expire",
          pairingExpiredListener
        );
      }
    };
    walletkit.once("session_proposal", () => {
      walletkit.core.pairing.events.removeListener(
        "pairing_expire",
        pairingExpiredListener
      );
    });
    try {
      walletkit.core.pairing.events.on(
        "pairing_expire",
        pairingExpiredListener
      );
      await walletkit.pair({ uri });
    } catch (error) {
      console.log("err", error);
    } finally {
    }
  }
  useEffect(() => {
    const uri = searchParams.get("uri");
    console.log("🚀 ~ useEffect ~ uri:", uri);
    console.log("🚀 ~ Wc ~ walletkit:", walletkit);
    if (uri && walletkit) {
      onConnect(uri);
    }
  }, [searchParams, isInited]);

  return <div>Wc</div>;
};

export default Wc;
