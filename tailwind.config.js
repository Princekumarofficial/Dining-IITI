module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#145DA0",
        secondary: "#0C2D48",
        tertiary: "#2E8BC0",
        quaternary: "#B1D4E0",
      },
      fontFamily: {
        DMSans: ["DMSans", "sans-serif"],
        DMSansItalic: ["DMSansItalic", "sans-serif"],
      },
    },
  },
  plugins: [],
};
