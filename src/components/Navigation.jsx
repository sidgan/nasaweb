import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

// import { DatePicker } from 'react-rainbow-components';

const NavigationBar = () => {
    const incrementDate = () => {
        // Add One Day To Selected Date
    };

    const decrementDate = () => {
        // Minus One Dat To Selected Date
    };

    return (
        <Grid container spacing={1}>
        <Grid item>
            <Button
            onClick={incrementDate}
            style={{
                maxHeight: '40px',
                maxWidth: '40px',
                minHeight: '40px',
                minWidth: '40px',
                fontSize: '30px',
            }}
            variant="contained"
            color="secondary"
            active
            >
            <NavigateBeforeIcon />
            </Button>
        </Grid>
        <Grid item>
            <Button
                id="date"
                variant="contained"
                color="secondary"
                style={{
                    maxHeight: '40px',
                    maxWidth: '150px',
                    minHeight: '40px',
                    fontSize: '30px',
                }}
            >
                {/* <DatePicker
                minDate={new Date(2018, 10, 1)}
                maxDate={new Date(2020, 10, 8)}
                value={this.state.date}
                onChange={(value) =>
                    this.setState({ date: value.toDateString() })
                }
                placeholder="Pick A Date To See Meteors"
                formatStyle="large"
                /> */}
                <TextField
                    id="date"
                    type="date"
                />
            </Button>
        </Grid>
        <Grid item>
            <Button
            onClick={decrementDate}
            style={{
                maxHeight: '40px',
                maxWidth: '40px',
                minHeight: '40px',
                minWidth: '40px',
                fontSize: '30px',
            }}
            variant="contained"
            color="secondary"
            active
            >
            <NavigateNextIcon />
            </Button>
        </Grid>
        </Grid>
    );
};

export default NavigationBar;
