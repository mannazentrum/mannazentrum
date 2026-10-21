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
        'warm-ivory': '#FAF9F5',
        'warm-cream': '#F5F2EB',
        'slate-body': '#5A6578',
      },
      fontFamily: {
        sans: ['Outfit', 'Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['ui-serif', 'Georgia', 'Cambria', "Times New Roman", 'Times', 'serif'],
      }
    },
  },
  plugins: [],
}
