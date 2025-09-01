/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // 👈 very important for CRA + TS
  ],
  theme: {
    extend: {
      screens: {
        sm: "360px",
        md: "744px",
        lg: "1280px",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      },
      borderRadius: {
        lg: "8px",
        md: "6px",
      },
      fontSize: {
        sm: "14px",
        "2xl": "24px",
      },
      colors: {
        primary: {
          DEFAULT: "#0F172A",
        },
        "light-gray": "#E2E8F0",
        foreground: "#020617",
        "muted-foreground": "#64748B",
        destructive: "#DC2626",
      },
    },
  },
  plugins: [],
};
