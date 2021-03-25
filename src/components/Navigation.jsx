import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { KeyboardDatePicker } from '@material-ui/pickers';

import { useNavigationState } from '../contexts/navigation';

import leftIcon from '../images/left-icon.png';
import rightIcon from '../images/right-icon.png';

const getMaxDate = () => {
  let date = new Date();
  date.setDate(date.getDate());
  return `${date.toISOString().slice(0, 10)}`;
};

const NavigationBar = (props) => {
  const navigationState = useNavigationState();
  const [maxDate] = React.useState(`${getMaxDate()}`);

  const incrementDate = () => {
    // Add One Day To Selected Date
    const newDate = new Date(navigationState.date);

    newDate.setDate(newDate.getDate() + 1);
    const newdf = `${newDate.toISOString().slice(0, 10)}`;

    if (newdf < maxDate && newdf > '2010-04-14') {
      navigationState.changeDate(newdf);
      props.onChange(newdf);
    }
  };

  const decrementDate = () => {
    // Minus One Dat To Selected Date
    const newDate = new Date(navigationState.date);

    newDate.setDate(newDate.getDate() - 1);
    const newdf = newDate.toISOString().slice(0, 10);

    if (newdf < maxDate && newdf > '2010-04-14') {
      navigationState.changeDate(newdf);
      props.onChange(newdf);
    }
  };

  const handleDateChange = (newdf) => {
    if (newdf < maxDate && newdf > '2010-04-14') {
      navigationState.changeDate(newdf);
      props.onChange(newdf);
    }
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
        >
          <img src={leftIcon} alt={leftIcon}></img>
        </Button>
      </Grid>
      <Grid item>
        <FormControl variant="filled">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="yyyy-MM-dd"
            color="secondary"
            style={{
              fontSize: '15px',
              color: 'black',
              width: '150px',
            }}
            value={navigationState.date}
            onChange={handleDateChange}
            allowKeyboardControl={false}
            minDate="2010-04-14"
            maxDate={maxDate}
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
        >
          <img src={rightIcon} alt={rightIcon}></img>
        </Button>
      </Grid>
    </Grid>
  );
};

export default React.memo(NavigationBar);
