/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vault: '#0B0F14',
        steel: '#111820',
        cyan: '#00C2CB',
        amber: '#F5A623',
        fog: '#F4F6F9',
        glacier: '#E8EDF3',
        slate: '#6B7A8D',
        wire: '#1E2A38',
        signal: '#00E87A',
      },
      fontFamily: {
        heading: ['"DM Sans"', 'sans-serif'],
        drama: ['"Fraunces"', 'serif'],
        body: ['"IBM Plex Sans"', 'sans-serif'],
        data: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
