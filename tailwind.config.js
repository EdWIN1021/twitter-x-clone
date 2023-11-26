/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1D9BF0",
        label: "rgb(83,100,113)",
      },
      height: {
        input: "60px",
      },
    },
  },
  plugins: [],
};
