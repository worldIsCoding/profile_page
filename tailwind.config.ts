import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode:"class",
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat"],
        COOL: ["Courier Prime"],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      height:{
        screen:"100dvh"
      },
      minHeight:{
        screen: "100dvh"
      },
      colors:{
        dark:{
          primary:"132043",
          secondary:"1F4172",
          main:"F1B4BB",
          normal:"FDF0F0"
        },
        light:{
          primary:"EBE4D1",
          secondary:"B4B4B3",
          main:"26577C",
          normal:"E55604"
        }
      }
     
    },
  },
  plugins: [],
}
export default config
