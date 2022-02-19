module.exports = {
  content: ['./components/**/*.vue'],
  theme: {
    fontFamily: {
      'body': ['Helvetica', 'Arial', 'sans-serif'],
    },
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        'keys': 'repeat(7, 1fr 1.5fr 1fr)',
      },
      gridColumnStart: {
        '13': '13',
        '14': '14',
        '15': '15',
        '16': '16',
        '17': '17',
        '18': '18',
        '19': '19',
        '20': '20',
        '21': '21',
      },
      gridColumnEnd: {
        '13': '13',
        '14': '14',
        '15': '15',
        '16': '16',
        '17': '17',
        '18': '18',
        '19': '19',
        '20': '20',
        '21': '21',
      },
    },
    colors: {
      'bg': {
        100: '#282D47',
        200: '#151A33',
      },
      'primary': '#E0AD7B',
      'key-white': '#E9E2D9',
      'key-black': '#1D2139',
      'key-selected': '#84ABCF',
      
      'tahiti': {
        100: '#cffafe',
        200: '#a5f3fc',
        300: '#67e8f9',
        400: '#22d3ee',
        500: '#06b6d4',
        600: '#0891b2',
        700: '#0e7490',
        800: '#155e75',
        900: '#164e63',
      },
      // ...
    },
  },
  plugins: [],
}
