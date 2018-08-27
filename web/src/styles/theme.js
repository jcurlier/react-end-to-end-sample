const theme = {
  breakpoints: ['40em', '52em', '64em'],
  fontSizes: [12, 14, 16, 18, 24, 32, 48, 64, 72],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  radii: {
    small: '5px',
  },
  fonts: {
    serif: 'athelas, georgia, times, serif',
    sansSerif:
    'Geomanist, -apple-system, BlinkMacSystemFont, "avenir next", avenir, "helvetica neue", helvetica, ubuntu, roboto, noto, "segoe ui", arial, sans-serif',
  },
  colors: {
    // leftover
    'near-black': '#111',
    'mid-gray': '#555',
    silver: '#999',
    'light-silver': '#aaa',

    // Styles
    blue: '#007EC5',
    'pale-blue': '#F7F8FC',
    'light-blue': '#17ABCC',
    'deep-blue': '#2964EA',
    green: '#62BB46',
    red: '#E82C2A',
    purple: '#8D29EA',

    black: '#000',
    'dark-gray': '#23252d',
    gray: '#8fa1a7',
    //'#c3c5ca',
    //'#c6c7cc',
    'moon-gray': '#d4dcdf',
    'light-gray': '#eff0f4',
    'near-white': '#f7f7f9',
    white: '#fff',
    transparent: 'transparent',
  },
  shadows: {
    card: '0 6px 9px 0 rgba(144,164,183,0.22)',
    menu: '0 20px 45px 0 rgba(65, 75, 82, 0.30)',
    'menu-small': '0 7px 16px 0 rgba(65, 75, 82, 0.30)',
  },
};

theme.buttons = {
  primary: {
    color: 'white',
    backgroundColor: theme.colors.blue,
    '&:hover': {
      color: 'white',
    }
  },
};

theme.gradients = {
  'clear-sky': `linear-gradient(315deg, ${theme.colors['light-blue']} 0%, ${theme.colors.blue} 100%)`,
  'shadow-overlay': `linear-gradient(225deg, rgba(35,37,45,0.7) 0%, rgba(35,37,45,0) 100%)`,
};

export default theme;
