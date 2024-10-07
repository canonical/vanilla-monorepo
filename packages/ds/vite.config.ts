import { getShareableLightningCssConfig } from "@canonical/lightningcss-config-vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(getShareableLightningCssConfig({
  plugins: react()
}));
