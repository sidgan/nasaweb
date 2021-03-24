import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#474E74',
    },
    secondary: {
      main: 'rgba(71, 78, 116, 0.6)',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(223, 223, 236)',
    },
  },

  typography: {
    fontFamily: 'Roboto Mono',
  },

  shape: {
    borderRadius: '4px',
  },

  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
        backgroundColor: 'rgba(71, 78, 116, 0.6)',
        opacity: 0.8,
      },
    },

    MuiMenuList: {
      root: {
        width: '150px',
      },
    },

    MuiSelect: {
      root: {
        color: '#ffffff',
        maxHeight: '50px',
        minHeight: '50px',
      },
    },

    MuiPaper: {
      root: {
        color: 'primary',
      },
    },

    MuiPickersDay: {
      day: {
        color: 'primary',
      },
    },

    MuiIconButton: {
      root: {
        color: 'primary',
      },
    },

    MuiInputBase: {
      root: {
        height: '50px',
        textTransform: 'none',
        backgroundColor: 'rgba(71, 78, 116, 0.6)',
        opacity: 0.8,
      },
      input: {
        fontSize: '13px',
      },
    },

    MuiDatePicker: {
      root: {
        backgroundColor: 'rgba(71, 78, 116, 0.6)',
        // color: "primary",
        fontSize: '1.4rem',
        alignContent: 'center',
        maxWidth: '170px',
        minHeight: '50px',
        color: 'white',
      },
    },

    MuiMenuItem: {
      root: {
        backgroundColor: 'rgba(71, 78, 116, 0.6)',
        opacity: 0.8,
      },
    },

    MuiTypography: {
      h3: {
        fontFamily: 'Roboto Condensed',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '16px',
        lineHeight: '19px',
        padding: '1vh',
        textTransform: 'uppercase',
        letterSpacing: '1.5px',
      },
      h4: {
        fontSize: '16px',
        lineHeight: '16px',
        fontWeight: 500,
      },
      h5: {
        fontFamily: 'Roboto Condensed',
        fontSize: '14px',
        lineHeight: '18px',
        fontWeight: 400,
        padding: '10px',
        letterSpacing: '1.5px',
      },
    },

    MuiTableBody: {
      root: {
        backgroundColor: 'rgba(71, 78, 116, 0.6)',
        opacity: 0.8,
      },
    },
    MuiTableHead: {
      root: {
        color: 'textSecondary',
        backgroundColor: 'rgba(71, 78, 116, 0.6)',
        opacity: 0.8,
      },
    },
    MuiTableCell: {
      root: {
        color: 'textSecondary',
        backgroundColor: 'rgba(71, 78, 116)',
        opacity: 0.8,
      },
    },
  },
});

export default theme;