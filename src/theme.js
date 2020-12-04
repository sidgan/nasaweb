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

        MuiMenuItem: {
            root: {
                backgroundColor: "rgba(71, 78, 116, 0.6)",
                fillOpacity: 0.5
            }
        }
    }
})


export default theme;