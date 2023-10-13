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
        Binary :['Binary X CHR BRK', "sans-serif"]
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
        // dark:{
        //   primary:{
        //     500:"#132043"},
        //   secondary:{500:"#1F4172"},
        //   main:{500:"#F1B4BB"},
        //   normal:{500:"#FDF0F0"}
        // },
        blue:{
          300:"#d4f0fc", //	(212,240,252)
          400:"#89d6fb", //(137,214,251)
          500:"#02a9f7", //	(2,169,247)
          600:"#02577a", //	(2,87,122)
          700:"#01303f" // (1,48,63)
        }
        
          // primary:{
          //   500:"#008000"
          // },
          // secondary:{
          //   500:"#656565"}
          //   ,
          // main:{
          //   500:"#D5D5D5"},
          // normal:{
          //   500:"#E55604"}
      }
     
    },
  },
  plugins: [],
}
export default config
