module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        artinuMain:'#FAF7F1',
        artinuPink:'#F8EDF0'
      },
      backgroundImage: theme => ({
        'hero-pattern': "url('/src/images/hero-pattern.jpg')",
       })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
