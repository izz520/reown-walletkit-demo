import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import type { ITypeData } from "@/types/wallet";
import { supportedChains } from "./chain";

const privateKey =
  "0xbfa615c48501072791c88bfc5544b24f91b23161836b25ac67040b3f05ac269f";
console.log("🚀 ~ privateKey:", privateKey);
const account = privateKeyToAccount(privateKey);

const createClient = (chainId: string) => {
  return createWalletClient({
    account: account,
    chain: supportedChains[chainId as keyof typeof supportedChains],
    transport: http()
  });
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

const sendTransaction = async (chainId: string, data: any) => {
  console.log("🚀 ~ sendTransaction ~ data:", data);
  const provider = createClient(chainId);
  const tx = await provider.sendTransaction(data);
  return tx;
};

export {
  account,
  privateKey,
  signMessage,
  createClient,
  signTypedData,
  sendTransaction
};
