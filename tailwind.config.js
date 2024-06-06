/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
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
      },
      height: {
        '128': '32rem',
      }
    }
  },
  plugins: [],
}

