/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#329C89",
        icon: "#212121",
        iconDark: "#9A9A9A",
        bgprimary: "#ECF3F3",
        bgsecondary: "#F5F9F9",
        err: "#F65B2A",
        textClr: "#1A3B58",
      },
    },
  },
  plugins: [],
};
