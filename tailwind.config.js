/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.{html,js}",
    './card/*.{html,js}',
  ],
  theme: {
    backgroundPosition: {
      'center-center': 'center center',
    },
    extend: {
      colors: {
        'cloud-blue': '#1089ff',
      },
      width: {
        '128': '32rem',
        'port-img': '48rem',
      },
      height: {
        '128': '32rem',
        '130': '33rem',
      }
    }
  },
  plugins: [],
}

