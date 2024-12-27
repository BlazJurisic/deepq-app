/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          card: 'var(--bg-card)'
        },
        content: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)'
        }
      },
      borderColor: {
        DEFAULT: 'var(--border-color)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-5px)' },
          '40%, 80%': { transform: 'translateX(5px)' }
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        shake: 'shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both',
        'fade-in': 'fade-in 0.2s ease-out'
      }
    },
  },
  plugins: [],
};
