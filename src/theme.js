import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#474E74'
        },
        secondary: {
            main: '#464d73'
        },
        text: {
            primary: "#ffffff",
            secondary: "rgba(223, 223, 236, 0.863)"
        }
    },

    typography: {
        fontFamily: "Roboto",
        fontSize: "22px",
    },

    shape: {
        borderRadius: "4px"
    },

    overrides: {
        MuiButton: {
            root: {
                textTransform: "none",
            }
        },

        MuiMenuItem: {
            root: {
                backgroundColor: "rgba(71, 78, 116)"
            }
        }
    }
})


export default theme;