/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
   
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif'],

    },

    extend: {
      backgroundImage: {
        'sale-banner-bg': "url('/src/Assets/Photos/sale bg.png')",
        'blog-banner': "url('/src/Assets/Photos/blog banner.png')",
      },
      colors: {
        'white': '#ffffff',
        'dark-toned': '#5a5858',
        'red': '#DB2F06',
        'red-toned': '#FAE8E4',
        'snow-white': 'rgb(241,246,247)',
        'snow-white-toned': '#f2f2f2',
        'gray': '#8B928F',
        'white-toned': '#fffff5',




      }
    },
  },
  plugins: [
    
  ],
}