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
          primary:{
            500:"#132043"},
          secondary:{500:"#1F4172"},
          main:{500:"#F1B4BB"},
          normal:{500:"#FDF0F0"}
        },
        
          primary:{
            500:"#EBE4D1"},
          secondary:{
            500:"#B4B4B3"}
            ,
          main:{
            500:"#26577C"},
          normal:{
            500:"#E55604"}
        
      }
     
    },
  },
  plugins: [],
}
export default config
