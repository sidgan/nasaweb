import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';


const DatePicker = () => {
    return (
        <Grid container spacing={1}>
            <Grid item>
                <Button style={{maxHeight: "40px", maxWidth: "40px", minHeight: "40px", minWidth: "40px", fontSize: "30px"}} variant="contained" color="secondary" active>
                    <NavigateBeforeIcon />
                </Button>
            </Grid>
            <Grid item>
                <Button
                    id="date"
                    variant="contained"
                    color="secondary"
                >
                    <TextField
                        id="date"
                        type="date"
                        defaultValue="Nov 28, 2020"
                    />
                </Button>
            </Grid>
            <Grid item>
                <Button style={{maxHeight: "40px", maxWidth: "40px", minHeight: "40px", minWidth: "40px", fontSize: "30px"}} variant="contained" color="secondary" active>
                    <NavigateNextIcon />
                </Button>
            </Grid>
        </Grid>
    )
};

export default DatePicker;