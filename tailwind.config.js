/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2D2E33", // Primary color
        secondary: "#6B7280", // Secondary color
        bold: "#21252C", // Bold color
      },
    },
  },
  plugins: [],
};
