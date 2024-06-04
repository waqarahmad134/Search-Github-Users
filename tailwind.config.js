/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins",
      },
      backgroundImage: {
        heroBg: "url('/rectangle-2@2x.png')",
        exteriorHeroBg: "url('/images/hero.jpg')",
        heroSectionBg: "url('/images/herobg.jpg')",
        "payment-bg": "url('/images/payment-bg.webp')",
      },
    },
  },
  plugins: [],
};
