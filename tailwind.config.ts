import { color } from 'framer-motion'
import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      fontFamily: {
        dancing: ['Dancing Script', 'cursive'],
      },
      colors: {
        twitter: '#1DA1F2',
        // Optional neutrals close to Twitter’s dark theme
        slateX: {
          900: '#0f1419', // app bg
          800: '#15202b', // card hover
          700: '#1e2732',
        },
      },
      extend: {},
    },
    plugins: [],
  } satisfies Config