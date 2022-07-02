import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), vanillaExtractPlugin()],
});
