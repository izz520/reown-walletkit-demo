import {
  arbitrum,
  avalanche,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
  zksync
} from "viem/chains";

export const supportedChains = {
  "eip155:1": mainnet,
  "eip155:43114": avalanche,
  "eip155:137": polygon,
  "eip155:10": optimism,
  "eip155:324": zksync,
  "eip155:8453": base,
  "eip155:42161": arbitrum,
  "eip155:11155111": sepolia
};

export const supportedChainId = Object.keys(supportedChains);
