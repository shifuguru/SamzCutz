import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        onyx: "#050505",
        charcoal: "#0f0f11",
        obsidian: "#16161a",
        gilded: "#d4af37",
        brass: "#c9951a",
        platinum: "#d7d7d9",
        silver: "#a7a7ad",
        ember: "#b25d3a",
        parchment: "#f6f0e8"
      },
      fontFamily: {
        display: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        body: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        accent: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"]
      },
      boxShadow: {
        focus: "0 0 0 3px rgba(212, 175, 55, 0.45)",
        gold: "0 20px 45px rgba(212, 175, 55, 0.18)"
      },
      backgroundImage: {
        "noir-gradient": "linear-gradient(135deg, rgba(5,5,5,0.95), rgba(17,17,19,0.85))",
        "gold-sheen": "radial-gradient(circle at top, rgba(212,175,55,0.35), transparent 55%)",
        "key-pattern": "repeating-linear-gradient(90deg, rgba(212,175,55,0.65) 0, rgba(212,175,55,0.65) 6px, transparent 6px, transparent 16px)"
      },
      borderImage: {
        greek: "linear-gradient(90deg, rgba(212,175,55,0.9), rgba(167,167,173,0.8)) 1"
      },
      keyframes: {
        glow: {
          "0%": { opacity: "0.4" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0.4" }
        },
        float: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
          "100%": { transform: "translateY(0px)" }
        }
      },
      animation: {
        glow: "glow 4s ease-in-out infinite",
        float: "float 10s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
