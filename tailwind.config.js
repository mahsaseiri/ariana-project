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
        base: "15px",
        "2xl": "24px",
      },
      colors: {
        primary: {
          DEFAULT: "#0F172A",
        },
        secondary: {
          DEFAULT: "#F1F5F9",
        },
        gray: "#4E5553",
        "light-gray": "#E2E8F0",
        "dark-gray": "#585858",
        foreground: "#020617",
        "secondary-foreground": "#0F172A",
        "muted-foreground": "#64748B",
        destructive: "#DC2626",
        muted: "#F1F5F9",
        "lightest-gray": "#F8FAFC",
        "sidebar-background": "#F8FAFC",
        "sidebar-border": "#E2E8F0",
        "post-card": "#78788014",
      },
    },
  },
  plugins: [],
};
