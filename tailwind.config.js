/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      'gradient-radial': 'radial-gradient(var(--gradient-color-stops))',
    },
  },
  plugins: [],
}

