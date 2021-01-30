import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

const DatePicker = (props) => {
  const [value, setValue] = useState(props.selectedDate);

  const incrementDate = () => {
    // Add One Day To Selected Date
  };

  const decrementDate = () => {
    // Minus One Dat To Selected Date
  };

  const handleDateChange = (e) => {
    setValue(e.target.value);

    // Update Parent Component
    // props.onDateChange(e.target.value);
  };

  if (props.showAarrows) {
    return (
      <Grid container spacing={1}>
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
            <NavigateNextIcon />
          </Button>
        </Grid>
      </Grid>
    );
  } else {
    return (
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
    );
  }
};

export default React.memo(DatePicker);
