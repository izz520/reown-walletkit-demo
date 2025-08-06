import { privateKeyToAccount } from "viem/accounts";

const privateKey =
  "0xbfa615c48501072791c88bfc5544b24f91b23161836b25ac67040b3f05ac269f";
console.log("🚀 ~ privateKey:", privateKey);
const account = privateKeyToAccount(privateKey);

const signMessage = async (message: string) => {
  const signature = await account.signMessage({
    message: message
  });
  return signature;
};

export { account, privateKey, signMessage };
