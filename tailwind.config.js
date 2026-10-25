export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFFBE7',
        inputBg: '#F0E9E9',
        inputErrorBg: '#F29B9B',
        loginGreen: '#103B0B',
        loginGreenHover: '#195212',
        registerGreen: '#1E5112',
        registerGreenHover: '#276818',
        leafDark: '#1E7E48',
        leafLight: '#A3DE83'
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        authCard: '0 4px 10px rgba(0, 0, 0, 0.12)',
        googleBtn: '0 1px 3px rgba(0, 0, 0, 0.12)'
      }
    }
  },
  plugins: []
};