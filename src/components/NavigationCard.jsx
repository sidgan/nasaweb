import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { useNavigationState } from '../contexts/navigation';

import leftIcon from '../images/left-icon.png';
import rightIcon from '../images/right-icon.png';

const getMaxDate = () => {
  let date = new Date();
  date.setDate(date.getDate());
  return `${date.toISOString().slice(0, 10)}`;
};

const NavigationCard = (props) => {
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

  const handleDateChange = (d) => {
    let newDate = d.toISOString().slice(0, 10);

    if (newDate < maxDate && newDate > '2010-04-14') {
      navigationState.changeDate(newDate);
      props.onChange(newDate);
    }
  };
  return (
    <>
      <Typography variant="h6" color="textSecondary" className="text-left p-1">
        Current Date:
      </Typography>
      <Typography variant="h2" color="textSecondary" className="text-left p-1">
        NOV 6, 2021
      </Typography>
      <Grid container spacing={1} className="p-1">
        <Grid item onClick={decrementDate}>
          <Button
            style={{
              minHeight: '40px',
              minWidth: '40px',
              fontSize: '30px',
            }}
            variant="contained"
            color="secondary"
          >
            <img src={leftIcon} alt={leftIcon}></img>
          </Button>
        </Grid>
        <Grid item onClick={incrementDate}>
          <Button
            style={{
              minHeight: '40px',
              minWidth: '40px',
              fontSize: '30px',
            }}
            variant="contained"
            color="secondary"
          >
            <img src={rightIcon} alt={rightIcon}></img>
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={1} className="p-1">
        <Grid item>
          <FormControlLabel
            className="timeline-box"
            control={<Checkbox />}
            label={
              <Typography variant="h6" color="textSecondary">
                Video View
              </Typography>
            }
          />
        </Grid>
      </Grid>
    </>
  );
};

export default NavigationCard;
