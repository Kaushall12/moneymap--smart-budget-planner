import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      "/login": "http://backend:8000",
      "/otp": "http://backend:8000",
      "/income": "http://backend:8000",
      "/expense": "http://backend:8000",
      "/budget": "http://backend:8000",
      "/monthly": "http://backend:8000",
      "/saving": "http://backend:8000",
      "/payment": "http://backend:8000",
      "/admin": "http://backend:8000",
      "/uploads": "http://backend:8000",
    },
  },
});