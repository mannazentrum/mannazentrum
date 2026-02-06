/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#42210b',
        'cream': '#F9F4E8',
        'accent': '#f3b524',
      },
      fontFamily: {
        'sans': ['Mulish', 'sans-serif'],
        'serif': ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}
