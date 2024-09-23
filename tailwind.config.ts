const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        enter: "fadeInRight 300ms ease-out",
        leave: "fadeOutLeft 300ms ease-in forwards",
        show: "fadeShow 200ms ease-out",
      },
      keyframes: {
        fadeInRight: {
          "0%": {
            opacity: "0",
            transform: "translate(2rem)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(0)",
          },
        },
        fadeShow: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        fadeOutLeft: {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
      },
      colors: {
        debug: "coral",
        primary: {
          10: "#F2FBFF",
          20: "#E4F7FF",
          30: "#C2EBFE",
          40: "#1C9ED8",
          60: "#1781BF",
          80: "#1D589E",
          90: "#1B4786",
        },
        secondary: {
          10: "#B4BAC8",
          60: "#131629",
        },
        red: {
          10: "#FEF2F2",
          60: "#DC2626",
        },
        yellow: {
          10: "#FEFCE8",
          60: "#CA8A04",
        },
        success: {
          10: "#ECFDF5",
          20: "#D1FAE5",
          30: "#A7F3D0",
          40: "#6EE7B7",
          50: "#34D399",
          60: "#10B981",
          70: "#059669",
          80: "#047857",
          90: "#065F46",
          100: "#064E3B",
        },
        gray: {
          10: "#F9FAFB",
          20: "#F3F4F6",
          30: "#E5E7EB",
          40: "#D1D5DB",
          50: "#9CA3AF",
          60: "#6B7280",
          70: "#4B5563",
          80: "#374151",
          90: "#1F2937",
          100: "#111827",
        },
        danger: {
          10: "#FEF2F2",
          20: "#FEE2E2",
          30: "#FECACA",
          40: "#FCA5A5",
          50: "#F87171",
          60: "#EF4444",
          70: "#DC2626",
          80: "#B91C1C",
          90: "#991B1B",
          100: "#7F1D1D",
        },
        indicator: {
          red: "#E51717",
          magenta: "#E91D62",
          purple: "#9C29B2",
          deepPurple: "#663CB5",
          indigo: "#4153B5",
          blue: "#2176F5",
          lightBlue: "#02A9F7",
          cyan: "#01BCD6",
          teal: "#039789",
          green: "#4CB051",
          lightGreen: "#8DC34B",
          lime: "#CBDD38",
          yellow: "#FFE93D",
          amber: "#FCC005",
          grande: "#FF9800",
          deepOrange: "#FE5823",
          brown: "#7B5649",
          grey: "#9E9E9E",
          blueGrey: "#5F7D8C",
          black: "#373232",
        },
      },

      fontFamily: {
        Inter: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        xs: ["12px", "16px"],
        sm: ["14px", "20px"],
        base: ["16px", "24px"],
        lg: ["20px", "28px"],
        xl: ["24px", "32px"],
      },
    },
  },
  plugins: [],
};
