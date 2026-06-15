// vite.config.ts — Pure frontend config, Cloudflare Pages compatible
// Run from: frontend/
// Build output: frontend/dist/  (set Cloudflare Pages: Build output directory = dist)

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
  },
  // No server-side code — pure static build
});
