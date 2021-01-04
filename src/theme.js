import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#474E74'
        },
        secondary: {
            main: 'rgba(71, 78, 116, 0.6)'
        },
        text: {
            primary: "#ffffff",
            secondary: "rgba(223, 223, 236)"
        }
    },

    typography: {
        fontFamily: "Roboto Mono",
    },

    shape: {
        borderRadius: "4px"
    },

    overrides: {
        MuiButton: {
            root: {
                textTransform: "none",
                backgroundColor: "rgba(71, 78, 116, 0.6)",
                opacity: 0.8,
            }
        },

        MuiMenuList: {
            root: {
                padding: "0px",
                width: "150px"
            },

            padding: {
                padding: "0px"
            }
        },

        MuiMenuItem: {
            root: {
                backgroundColor: "rgba(71, 78, 116, 0.6)",
                opacity: 0.8,
            }
        },

        MuiInputBase: {
            root: {
                backgroundColor: "rgba(71, 78, 116, 0.6)",
                color: "primary",
                fontSize: "1.4rem"
            }
        },

        MuiTableBody: {
            root: {
                backgroundColor: "rgba(71, 78, 116, 0.6)",
                opacity: 0.8,
            }
        },
        MuiTableHead: {
            root: {
                color: "textSecondary",
                backgroundColor: "rgba(71, 78, 116, 0.6)",
                opacity: 0.8,
            }
        },
        MuiTableCell: {
            root: {
                color: "textSecondary",
                backgroundColor: "rgba(71, 78, 116)",
                opacity: 0.8,
            }
        },
        
    }
})


export default theme;