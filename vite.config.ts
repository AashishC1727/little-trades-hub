import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/api/market/snapshot": {
        target: "https://iwbdeakpqfljskpxjejm.supabase.co",
        changeOrigin: true,
        rewrite: (path) => path.replace("/api/market/snapshot", "/functions/v1/market-snapshot"),
      },
      "/api/market/stream": {
        target: "https://iwbdeakpqfljskpxjejm.supabase.co",
        changeOrigin: true,
        rewrite: (path) => path.replace("/api/market/stream", "/functions/v1/market-stream"),
      },
    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
