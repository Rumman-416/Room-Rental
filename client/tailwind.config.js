/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      mp: "375px",
      lp: "425px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
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
