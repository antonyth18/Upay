/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.stories.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'h1-custom': '36px', // Define a custom size for h1
        'h2-custom': '24px', // Define a custom size for h2
      }
    },
  },
  plugins: [],
}

