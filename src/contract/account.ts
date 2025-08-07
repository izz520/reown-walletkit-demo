import { createWalletClient, http, type WalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import type { ITypeData } from "@/types/wallet";
import { supportedChains } from "./chain";

const walletClients = new Map<string, WalletClient>();
const privateKey =
  "0xbfa615c48501072791c88bfc5544b24f91b23161836b25ac67040b3f05ac269f";
console.log("🚀 ~ privateKey:", privateKey);
const account = privateKeyToAccount(privateKey);

const createClient = (chainId: string) => {
  if (walletClients.has(chainId)) {
    return walletClients.get(chainId);
  }
  console.log(
    "chainId as keyof typeof supportedChains",
    chainId as keyof typeof supportedChains
  );

  const chain = supportedChains[chainId as keyof typeof supportedChains];
  console.log("🚀 ~ createClient ~ chain:", chain);
  const client = createWalletClient({
    chain: supportedChains[chainId as keyof typeof supportedChains],
    transport: http()
  });
  walletClients.set(chainId, client);
  return client;
};

const signMessage = async (message: string) => {
  const signature = await account.signMessage({
    message: message
  });
  return signature;
};

const signTypedData = async (chainId: string, data: ITypeData) => {
  console.log("🚀 ~ signTypedData ~ data:", data);
  console.log("🚀 ~ signTypedData ~ chainId:", chainId);
  const signature = await account.signTypedData({
    ...data
  });
  return signature;
};

export { account, privateKey, signMessage, createClient, signTypedData };
