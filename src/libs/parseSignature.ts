import { hexToString } from "viem";

const parseSignature = (hexMessage: string) => {
  if (!hexMessage) return;
  return hexToString(hexMessage as `0x${string}`);
};

export default parseSignature;
