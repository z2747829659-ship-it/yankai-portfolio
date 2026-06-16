import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  cacheDir: ".vite",
  optimizeDeps: {
    exclude: ["framer-motion", "lucide-react", "ogl", "react", "react-dom", "three"]
  },
  server: {
    host: "127.0.0.1",
    fs: {
      strict: false
    }
  }
});
