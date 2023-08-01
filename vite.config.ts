import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { obfuscator } from "rollup-obfuscator";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), vanillaExtractPlugin()],
  build: {
    rollupOptions: {
      output: {
        plugins: [
          // <-- use plugins inside output to not merge chunks on one file
          obfuscator(),
        ],
      },
    },
  },
});
