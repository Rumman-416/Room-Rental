/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        'BT':'#DDBA86',
        'background':'#FFFEE9',
        'brandPrimary':'#000000',
        'card':'#D6C6AE',
      }
    },
  },
  plugins: [],
};
