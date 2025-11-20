/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./docs/**/*.{md,mdx}",
    "./blog/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        zm: {
          green: "#00C46B",      // 品牌主绿（明亮）
          greenDark: "#006B3C",  // 深一点的交易绿
          bgDark: "#021713",     // 深色背景（类似你图里的深绿背景）
        },
      },
    },
  },
  plugins: [],
};

