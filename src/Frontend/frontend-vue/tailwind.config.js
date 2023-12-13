/** @type {import('tailwindcss').Config} */

export default {
  darkMode: true,

  content: ['./src/**/*.vue'],
  theme: {
    extend: {}
  },
  daisyui: {
    themes: ['lofi', 'synthwave']
  },
  plugins: [require('@tailwindcss/forms'), require('daisyui'), require('@tailwindcss/typography')],
  safelist: [
    'input',
    'input-bordered',
    'select',
    'select-bordered',
    'textarea',
    'textarea-bordered'
  ]
}
