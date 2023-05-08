/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#101010",
        secondary: "#252525",
        accent1: "#ff037c",
        accent2: "#45ffff",
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in-out",
      },
      keyframes: (theme) => ({
        fadeIn: {
          "0%": { backgroundColor: theme("colors.gray.500") },
          "100%": { backgroundColor: theme("colors.secondary") },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
