import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
    sourcemapIgnoreList: (sourcePath, sourcemapPath) => {
      return !/node_modules/.test(sourcePath);
    },
  },
});
