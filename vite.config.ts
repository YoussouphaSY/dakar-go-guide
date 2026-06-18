import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // GitHub Pages sert le site sous /dakar-go-guide/.
  // En dev (et sur Vercel via VITE_BASE=/) on garde la racine.
  base: mode === "production" ? (process.env.VITE_BASE ?? "/dakar-go-guide/") : "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
