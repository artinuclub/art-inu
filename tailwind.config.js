module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        'xxs': '.55rem',
       },
      colors:{
        artinuMain:'#FF64AE',
        artinuPink:'#F8EDF0',
        artinuGreen:'#64FF99'
      },
      backgroundImage: theme => ({
        'hero-pattern': "url('/src/images/hero-pattern.jpg')",
        'artinuBack': "url('/src/images/artinuBack.jpg')",
       }),
       height: {
        bigbig: '800px',
       }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
