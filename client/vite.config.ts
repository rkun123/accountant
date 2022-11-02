import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { env } from 'process';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/query": env["ACCOUNTANT_ENV"] === 'production' ? "https://mio.chinchinmogamo.ga" : "http://localhost:8080",
    },
  },
});
