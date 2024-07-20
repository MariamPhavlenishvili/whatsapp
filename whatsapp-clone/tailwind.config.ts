import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Add other paths if necessary
    "./components/**/*.{js,jsx,ts,tsx}",
    "./views/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#075e54",
          400: "#128c7e",
          300: "#25d366",
          200: "#dcf8c6",
          100: "#ece5dd",
        },
        secondary: {
          400: "#88c5be",
          300: "#7ce4a3",
        },
      },
    },
  },
  plugins: [],
};
export default config;
