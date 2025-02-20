/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "Vazirmatn", "sans-serif"], 
        jersey15: ["Jersey15"], 
      },
    },
  },
  plugins: [require("rippleui")],
  /** @type {import('rippleui').Config} */
  rippleui: {
    themes: [
      {
        themeName: "dark",
        colorScheme: "dark",
        colors: {
          border: "#ffffff",
          primary: "#8c533b",
          secondary: "#171717",
          backgroundPrimary: "#000000",
        },
      },
    ],
  },
};
