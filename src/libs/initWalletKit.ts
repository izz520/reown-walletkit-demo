import { type IWalletKit, WalletKit } from "@reown/walletkit";
import { Core } from "@walletconnect/core";
import { setIsInited } from "@/store/walletkit";
export let walletkit: IWalletKit;
const core = new Core({
  projectId: import.meta.env.VITE_APP_ID,
  relayUrl: import.meta.env.VITE_RELAY_URL,
  logger: "error" // 只显示错误日志，减少输出
});
export async function createWalletKit() {
  try {
    walletkit = await WalletKit.init({
      core,
      metadata: {
        name: "MatchID",
        description: "MatchID",
        url: "https://walletconnect.com/",
        icons: ["https://avatars.githubusercontent.com/u/37784886"]
      },
      signConfig: {
        disableRequestQueue: true
      }
    });
    setIsInited(true);
    const clientId =
      await walletkit.engine.signClient.core.crypto.getClientId();
    console.log("WalletConnect ClientID: ", clientId);
    localStorage.setItem("WALLETCONNECT_CLIENT_ID", clientId);
  } catch (error) {
    console.error(
      "Failed to set WalletConnect clientId in localStorage: ",
      error
    );
    setIsInited(false);
  }
}

export async function updateSignClientChainId(
  chainId: string,
  address: string
) {
  console.log("chainId", chainId, address);
  // get most recent session
  const sessions = walletkit.getActiveSessions();
  if (!sessions) return;
  const namespace = chainId.split(":")[0];

  const sessionPromises = Object.values(sessions).map(async (session) => {
    await walletkit.updateSession({
      topic: session.topic,
      namespaces: {
        ...session.namespaces,
        [namespace]: {
          ...session.namespaces[namespace],
          chains: [
            ...new Set(
              [chainId].concat(
                Array.from(session?.namespaces?.[namespace]?.chains || [])
              )
            )
          ],
          accounts: [
            ...new Set(
              [`${chainId}:${address}`].concat(
                Array.from(session?.namespaces?.[namespace]?.accounts || [])
              )
            )
          ]
        }
      }
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const chainChanged = {
      topic: session.topic,
      event: {
        name: "chainChanged",
        data: parseInt(chainId.split(":")[1])
      },
      chainId: chainId
    };

    const accountsChanged = {
      topic: session.topic,
      event: {
        name: "accountsChanged",
        data: [`${chainId}:${address}`]
      },
      chainId
    };
    await walletkit.emitSessionEvent(chainChanged);
    await walletkit.emitSessionEvent(accountsChanged);
  });

  await Promise.all(sessionPromises);
}
