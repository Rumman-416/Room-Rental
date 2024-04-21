/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        BT: "#FF5757",
        // BT: "#DDBA86",
        background: "#F8aaaa",
        brandPrimary: "#000000",
        card: "#D6C6AE",
      },
      fontFamily: {
        title: ["Open Sans", "sans-serif"],
      },
    },
    plugins: [],
  },
};
