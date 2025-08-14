import {
  arbitrum,
  base,
  bsc,
  bscTestnet,
  mainnet,
  matchain,
  optimism,
  polygon,
  sepolia,
  zksync
} from "viem/chains";
import ArbitrumIcon from "@/assets/chains/arb.svg";
import BaseIcon from "@/assets/chains/base.svg";
import BSCIcon from "@/assets/chains/bsc.svg";
import EthereumIcon from "@/assets/chains/ethereum.svg";
import SepoliaIcon from "@/assets/chains/ethereum.svg";
import OptimismIcon from "@/assets/chains/op.svg";
import PolygonIcon from "@/assets/chains/polygon.svg";
import ZkSyncIcon from "@/assets/chains/zksync.svg";
// export const supportedChains = {
//   "eip155:1": mainnet,
//   "eip155:43114": avalanche,
//   "eip155:137": polygon,
//   "eip155:10": optimism,
//   "eip155:324": zksync,
//   "eip155:8453": base,
//   "eip155:42161": arbitrum,
//   "eip155:11155111": sepolia
// };

export const supportedChains = {
  "eip155:698": {
    config: matchain,
    icon: "https://icons.llamao.fi/icons/chains/rsz_matchain.jpg"
  },
  "eip155:1": {
    config: mainnet,
    icon: EthereumIcon
  },
  "eip155:137": {
    config: polygon,
    icon: PolygonIcon
  },
  "eip155:10": {
    config: optimism,
    icon: OptimismIcon
  },
  "eip155:56": {
    config: bsc,
    icon: BSCIcon
  },
  "eip155:324": {
    config: zksync,
    icon: ZkSyncIcon
  },
  "eip155:8453": {
    config: base,
    icon: BaseIcon
  },
  "eip155:42161": {
    config: arbitrum,
    icon: ArbitrumIcon
  },
  "eip155:11155111": {
    config: sepolia,
    icon: SepoliaIcon
  },
  "eip155:97": {
    config: bscTestnet,
    icon: BSCIcon
  }
};

export const supportedChainId = Object.keys(supportedChains);
