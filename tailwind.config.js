/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1D9BF0",
        label: "rgba(83,100,113)",
        "hover-gray": "rgba(15,20,25,0.1)",
      },
      height: {
        input: "60px",
      },
      screens: {
        xs: "500px",
        md: "987px",
        xl: "1264px",
      },
    },
  },
  plugins: [],
};
