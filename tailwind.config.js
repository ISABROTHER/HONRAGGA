/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Defined Custom Red based on Hex: #E50914
        'campaign-red': '#E50914', 
        'campaign-red-dark': '#C80811', // Used for borders/hover (strong contrast)
        'campaign-red-light': '#F2525A', // Used for accent text against the dark header
      }
    }, 
  },
  plugins: [],
};