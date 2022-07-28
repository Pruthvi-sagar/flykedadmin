const ThemeConfig = {
  palette: {
    primary: {
      main: '#EF613B',
      contrastText: '#fff',
    },
    secondary: {
      main: '#888F9D',
      dark: '#5b626f',
      contrastText: '#5b626f',
    },
  },
  status: {
    success: {
      main: '#18B013',
      light: '#DFF1DE',
    },
    danger: {
      main: '#F14A4A',
      light: '#FFE4E4',
    },
    error: {
      main: '#F14A4A',
      light: '#FFE4E4',
    },
    warning: {
      main: '#FF9A26',
      light: '#FFEBDA',
    },
  },
  typography: {
    fontFamily: ['SF Pro Rounded', 'sans-serif'].join(','),
    h1: {
      fontSize: 56,
    },
    h2: {
      fontSize: 45,
    },
    h3: {
      fontSize: 34,
    },
    h4: {
      fontSize: 23,
    },
    h5: {
      fontSize: 11,
    },
    h6: {
      fontSize: 9,
    },
    subtitle1: {
      fontSize: 24,
      fontWeight: '700',
    },
    subtitle2: {
      color: '#172849',
      fontSize: 18,
      fontWeight: '500',
    },
    body1: {
      fontSize: 14,
      fontWeight: '500',
    },
    body2: {
      fontSize: 12,
      fontWeight: '400',
    },

    button: {
      fontSize: 14,
      fontWeight: '500',
    },
    caption: {
      fontSize: 14,
      fontWeight: '500',
      color: '#888F9D',
    },
    overline: {
      color: '#EEEEEE',
    },
  },
  overrides: {
    MuiSelect: {
      outlined: {
        '&:focus': {
          backgroundColor: '#FFFFFF',
        },
      },
    },
    MuiFormLabel: {
      asterisk: {
        color: 'red',
        '&$error': {
          color: 'red',
        },
      },
    },
  },
}

export default ThemeConfig
