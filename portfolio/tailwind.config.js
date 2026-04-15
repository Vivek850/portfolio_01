/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens:{ // for small phones
            'xs': '320px', // extra small devices
            'smx': '375px',
            sm: '640px', //small devices
            md: '768px', //medium devices
            lg: '1024px', //large devices
            xl: '1280px', //extra large devices
           '2xl': '1536px', // for very large screens
           '3xl': '1920px',   // for Full HD screens
           '4xl': '2560px',   // for 2K / Ultra‑Wide screens
           '5xl': '3840px',   // for 4K screens
      },
      spacing:{
        max:'100%', //now we can use max
      }
    },
  },
  plugins: [],
}

