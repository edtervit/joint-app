module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2.5rem",
      },
      minHeight: {
        "75%": "75vh",
      },
      colors: {
        blue: {
          DEFAULT: "#34c8ed",
          dark: "#3590F3",
        },
        purple: "#2f0a2f",
        black: "101010",
        red: {
          DEFAULT: "#a21231",
          light: "#FFB82F",
        },
        gray: "#101010",
      },
    },
  },
  variants: ["responsive", "hover", "important"],
  plugins: [require("@neojp/tailwindcss-important-variant")],
};
