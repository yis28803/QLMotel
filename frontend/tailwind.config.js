/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#1AACAC",
      },
      boxShadow: {
        outer: "0px 5px 15px rgba(0, 0, 0, 0.35)",
      },
      flex: {
        2: "2 2 0%",
      },
    },
  },
  plugins: [],
};
