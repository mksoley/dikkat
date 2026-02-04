import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"] ,
  theme: {
    extend: {
      colors: {
        ink: "#0b1020",
        mist: "#f3f6ff",
        primary: "#3b82f6",
        accent: "#8b5cf6"
      },
      boxShadow: {
        panel: "0 18px 60px rgba(15, 23, 42, 0.15)"
      }
    }
  },
  plugins: []
} satisfies Config;
