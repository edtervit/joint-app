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
      width: {
        500: "500px",
      },
      colors: {
        blue: {
          DEFAULT: "#34c8ed",
          dark: "#3590F3",
          teal: "#00aa96",
        },
        purple: {
          DEFAULT: "#2f0a2f",
          light: "#751e6e",
        },
        black: "#101010",
        orange: "#cf5f1e",
        red: {
          DEFAULT: "#a21231",
          btn: "#ed345b",
        },
        gray: "#101010",
        green: "#94c83d",
      },
    },
  },
  variants: ["responsive", "hover", "active", "important"],
  plugins: [require("@neojp/tailwindcss-important-variant")],
};
