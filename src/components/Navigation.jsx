import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

const NavigationBar = (props) => {

    const [value, setValue] = useState(props.selectedDate);

    const incrementDate = () => {
        // Add One Day To Selected Date
        let newDate = new Date(value);

        newDate.setDate(newDate.getDate() + 1);
        setValue(newDate.toISOString().slice(0, 10));
        // props.onDateChange(value);
    };

    const decrementDate = () => {
        // Minus One Dat To Selected Date
        let newDate = new Date(value);

        newDate.setDate(newDate.getDate() - 1);
        setValue(newDate.toISOString().slice(0, 10));
        // props.onDateChange(value);
    };
    
    const handleDateChange = e => {
        setValue(e.target.value);

        // Update Parent Component
        props.onDateChange(e.target.value);
    };

    return (
        <Grid container spacing={1}>
        <Grid item>
            <Button
                onClick={decrementDate}
                style={{
                    minHeight: '50px',
                    minWidth: '50px',
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
                color="secondary"
                variant="contained"
                style={{
                    maxWidth: '150px',
                    minHeight: '50px',
                    fontSize: '30px',
                }}
            >
                <TextField
                    id="date"
                    type="date"
                    style={{
                        fontWeight: 'bolder',
                    }}
                    defaultValue={props.selectedDate}
                    value={value}
                    onChange={handleDateChange}
                />
            </Button>
        </Grid>
        <Grid item>
            <Button
                onClick={incrementDate}
                style={{
                    minHeight: '50px',
                    minWidth: '50px',
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

export default React.memo(NavigationBar);
