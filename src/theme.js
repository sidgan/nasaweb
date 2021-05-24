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
        width: '80%',
      },

      icon: {
        position: 'relative',
        color: '#ffffff',
        width: '30px',
        height: '30px',
        marginBottom: '10px',
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
        borderRadius: '4px',
        padding: '12px',
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
    // MuiDatePicker: {
    //   root: {
    //     backgroundColor: '#070c26',
    //     color: "white",
    //     fontWeight: "700"
    //   },
    // },

    MuiMenuItem: {
      root: {
        backgroundColor: 'rgba(71, 78, 116, 0.6)',
        opacity: 0.8,
      },
    },

    MuiGridItem: {
      root: {
        padding: '2px',
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
      h6: {
        fontFamily: 'Roboto Mono',
        fontSize: '14px',
        fontWeight: 200,
        letterSpacing: '1.5px',
      },
      h2: {
        fontFamily: 'Roboto Mono',
        fontSize: '32px',
        fontWeight: 700,
        lineHeight: '24px',
        letterSpacing: '1.5px',
        paddingLeft: '0px',
      }
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
    MuiCheckbox: {
      root: {
        width: '16px',
        height: '16px',
        borderRadius: '2px',
        backgroundColor: 'rgba(71, 78, 116, 0.6)',
        marginLeft: '1rem',
        marginRight: '1.5rem',
      },
    },
  },
});

export default theme;
