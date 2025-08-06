import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const dependenciesToChunk = {
  web3: ["wagmi", "@rainbow-me/rainbowkit", "viem"],
  react: ["react", "react-dom"],
  ui: ["@mui/material", "@emotion/styled", "@emotion/react"],
  misc: [
    // "zustand",
    "tailwind-merge",
    "react-phone-input-2"
  ]
};

export default defineConfig({
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  plugins: [react(), tailwindcss()],
  build: {
    sourcemap: true,
    target: "esnext",
    cssMinify: "lightningcss",
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (/\.woff2$/.test(assetInfo.name ?? "")) {
            return "assets/fonts/[name][extname]";
          }

          return "assets/[name]-[hash][extname]";
        },
        manualChunks: dependenciesToChunk
      }
    }
  },
  server: {
    allowedHosts: ["8804053e2d2e.ngrok-free.app"]
  }
});
