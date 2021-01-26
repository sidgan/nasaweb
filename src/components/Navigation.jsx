import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import NavigationContext from '../contexts/navigation';
import leftIcon from '../images/left-icon.png';
import rightIcon from '../images/right-icon.png';

const NavigationBar = (props) => {
  const [navigationState, setNavigationState] = useState(
    React.useContext(NavigationContext)
  );

  const incrementDate = () => {
    // Add One Day To Selected Date
    const newDate = new Date(navigationState.date);

    newDate.setDate(newDate.getDate() + 1);
    const newdf = `${newDate.toISOString().slice(0, 10)}`;
    setNavigationState({ source: navigationState.source, date: newdf });
    props.onChange(newdf);
  };

  const decrementDate = () => {
    // Minus One Dat To Selected Date
    const newDate = new Date(navigationState.date);

    newDate.setDate(newDate.getDate() - 1);
    const newdf = newDate.toISOString().slice(0, 10);
    setNavigationState({ source: navigationState.source, date: newdf });
    props.onChange(newdf);
  };

  const handleDateChange = (e) => {
    setNavigationState({
      source: navigationState.source,
      date: e.target.value,
    });

    // Update Parent Component
    props.onChange(e.target.value);
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
          <InputBase
            id="date"
            type="date"
            variant="filled"
            style={{
              backgroundColor: 'transparent',
              paddingRight: '5px',
              width: '180px',
            }}
            size="medium"
            value={navigationState.date}
            onChange={handleDateChange}
          />
        </Button>
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
