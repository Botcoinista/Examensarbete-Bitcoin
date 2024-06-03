const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        primary: '#FFA500', // Adjust the hex code to your desired primary color
      },
      height: {
        '100': '25rem', // Custom height value
        '120': '30rem', // Another custom height value
        '140': '35rem', // Yet another custom height value
      },
    },
  },
  plugins: [],
};
