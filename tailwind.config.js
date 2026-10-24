/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        mbz: {
          red: '#c4161c',
          'red-dark': '#9f1016',
          ink: '#15181d',
          body: '#3a414b',
          muted: '#586170',
          surface: '#f3f4f6',
          line: '#d5d9df',
        },
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Barlow', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
