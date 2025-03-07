import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression"; // Enables gzip/brotli compression

export default defineConfig({
  plugins: [
    react(),
    viteCompression(), // Compresses output files for faster loading
  ],
  build: {
    chunkSizeWarningLimit: 1000, // Increases warning limit from 500KB to 1000KB
    minify: "esbuild", // Ensures efficient JavaScript minification
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor"; // Splits third-party dependencies into a separate file
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Allows cleaner imports (e.g., "@/components/...")
    },
  },
});
