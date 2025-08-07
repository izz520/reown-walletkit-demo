export interface ITypeData {
  domain: {
    name: string;
    version: string;
    chainId: number;
    verifyingContract: `0x${string}`;
  };
  types: Record<string, any>;
  primaryType: string;
  message: Record<string, any>;
}

export interface ISendTransaction {
  to: `0x${string}`;
  value: bigint;
  data: string;
  gas: bigint;
  gasPrice: bigint;
  nonce: bigint;
  chainId: number;
}
