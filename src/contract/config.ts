import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { matchain } from "wagmi/chains";

const config = getDefaultConfig({
  appName: "Genesis NFT",
  projectId: "77022a4e45a601be34f9bfb10f223f05",
  chains: [matchain],
  ssr: true
});

export default config;
