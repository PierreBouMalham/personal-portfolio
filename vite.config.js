import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // Vercel project was created as CRA — keep the same output directory
    outDir: "build",
  },
});
