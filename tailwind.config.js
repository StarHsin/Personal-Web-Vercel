/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // 確保掃描所有 React 文件
  ],
  theme: {
    extend: {
      screens: {
        'xs': '400px', 
        // 您也可以在這裡調整或新增其他斷點
      },},
  },
  plugins: [],
};
