/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-brown': '#42210b',
        'brand-cream': '#F9F4E8',
      },
    },
  },
  plugins: [],
}
