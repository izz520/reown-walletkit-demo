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
