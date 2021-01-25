import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
// import InputBase from '@material-ui/core/InputBase';
import { KeyboardDatePicker } from "@material-ui/pickers";

import { DateContext } from '../context';

import leftIcon from '../images/left-icon.png';
import rightIcon from '../images/right-icon.png';

const NavigationBar = (props) => {
  const [value, setValue] = useState(React.useContext(DateContext));

  const incrementDate = () => {
    // Add One Day To Selected Date
    let newDate = new Date(value);

    newDate.setDate(newDate.getDate() + 1);
    let newdf = `${newDate.toISOString().slice(0, 10)}`;
    setValue(newdf);
    props.onChange(newdf);
  };

  const decrementDate = () => {
    // Minus One Dat To Selected Date
    let newDate = new Date(value);

    newDate.setDate(newDate.getDate() - 1);
    let newdf = newDate.toISOString().slice(0, 10);
    setValue(newdf);
    props.onChange(newdf);
  };

  const handleDateChange = (e) => {
    setValue(e);
    props.onChange(e);
  };

  return (
    <Grid container spacing={1}>
      <Grid item onClick={decrementDate}>
        <Button
          style={{
            minHeight: '50px',
            minWidth: '50px',
            fontSize: '30px',
          }}
          variant="contained"
          color="secondary"
          active
        >
          <img src={leftIcon} alt={leftIcon}></img>
        </Button>
      </Grid>
      <Grid item>
        <FormControl variant="outlined">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="yyyy-MM-dd"
            style={{
              fontSize: '15px',
              color: 'black',
              width: '150px'
            }}
            value={value}
            onChange={handleDateChange}
            allowKeyboardControl={false}
            minDate="2010-04-14"
            maxDate={`${new Date()}`}
          />
        </FormControl>

      </Grid>
      <Grid item onClick={incrementDate}>
        <Button
          style={{
            minHeight: '50px',
            minWidth: '50px',
            fontSize: '30px',
          }}
          variant="contained"
          color="secondary"
          active
        >
          <img src={rightIcon} alt={rightIcon}></img>
        </Button>
      </Grid>
    </Grid>
  );
};

export default React.memo(NavigationBar);
