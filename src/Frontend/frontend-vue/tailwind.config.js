

/** @type {import('tailwindcss').Config} */

export default {
  darkMode: true,
 
  content: [ './src/**/*.vue'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('daisyui'),
    require('@tailwindcss/typography')

  ],
  safelist: [
    "input",
    "input-bordered",
    "select",
    "select-bordered"
  ]
}

