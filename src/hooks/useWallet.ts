import type { SignClientTypes } from "@walletconnect/types";
import { useEffect } from "react";
import { createWalletKit, walletkit } from "@/libs/initWalletKit";

const useWallet = () => {
  const onSession2 = (
    session: SignClientTypes.EventArguments["session_proposal"]
  ) => {
    console.log("🚀 ~ onSession2 ~ session:", session);
  };

  useEffect(() => {
    createWalletKit();
  }, []);

  useEffect(() => {
    if (walletkit) {
      walletkit.on("session_proposal", onSession2);

      // 添加清理函数
      return () => {
        walletkit.off("session_proposal", onSession2);
      };
    }
  }, [walletkit]);

  // 返回 walletkit 以供其他组件使用
  return { walletkit };
};

export default useWallet;
