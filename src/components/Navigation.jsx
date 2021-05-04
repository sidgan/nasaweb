import React from 'react';
import classnames from 'classnames';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { useNavigationState } from '../contexts/navigation';
import DatePicker from './DatePicker';
import { calculateNewDate, checkIfValidDate } from '../utils/date';

import leftIcon from '../images/left-icon.png';
import rightIcon from '../images/right-icon.png';
import Checkmark from '../images/Checkmark.png';

const useStyles = makeStyles({
  input: {
    background: 'transparent',
    width: 200,
  },
  picker: {
    fontSize: '32px',
  },
  icon: {
    width: 16,
    height: 16,
    background: 'rgba(71, 78, 116, 0.6)',
    backdropFilter: 'blur(16px)',
    borderRadius: '2px',
  },
  checked: {
    backgroundImage: `url(${Checkmark})`,
  },
});

const StyledLabel = withStyles({
  label: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.8)',
  },
})(FormControlLabel);

const getMaxDate = () => {
  let date = new Date();
  date.setDate(date.getDate());
  return `${date.toISOString().slice(0, 10)}`;
};

const NavigationBar = (props) => {
  const navigationState = useNavigationState();
  const [maxDate] = React.useState(`${getMaxDate()}`);
  const [endMaxDate, setEndMax] = React.useState(`${getMaxDate()}`);

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

  const classes = useStyles();

  const CheckboxIcon = <div className={classes.icon}></div>;

  const CheckboxIconChecked = (
    <div className={classnames(classes.icon, classes.checked)}></div>
  );

  const handleToggle = () => {
    if (!navigationState.isInTimelineView) {
      navigationState.changeStartDate(navigationState.date);
      navigationState.changeEndDate('not set');
      const newMax = calculateNewDate(navigationState.date, 10);
      if (checkIfValidDate(newMax, maxDate)) {
        setEndMax(calculateNewDate(navigationState.date, 10));
      }
    }
    navigationState.toggleTimelineView();
  };

  return (
    <div className="navigation-container">
      {navigationState.isInTimelineView ? (
        <>
          <span style={{ opacity: '60%' }}>Start Date:</span>
          <div style={{ marginTop: '-10px' }}>
            <DatePicker
              selectedDate={navigationState.startDate}
              onChange={(date) => {
                navigationState.changeStartDate(date);
                navigationState.changeEndDate('not set');
                setEndMax(calculateNewDate(date, 10));
              }}
              minDate="2010-04-14"
              maxDate={maxDate}
            />
          </div>
          <span style={{ opacity: '60%' }}>End Date:</span>
          <div style={{ marginTop: '-10px' }}>
            <DatePicker
              selectedDate={navigationState.endDate}
              onChange={navigationState.changeEndDate}
              minDate={navigationState.startDate}
              maxDate={endMaxDate}
            />
          </div>
        </>
      ) : (
        <>
          <span style={{ opacity: '60%' }}>Current Date:</span>
          <div style={{ marginTop: '-10px' }}>
            <DatePicker
              selectedDate={navigationState.date}
              onChange={navigationState.changeDate}
              minDate="2010-04-14"
              maxDate={maxDate}
            />
          </div>
          <Grid container spacing={1}>
            <Grid item onClick={decrementDate}>
              <Button
                style={{
                  minHeight: '32px',
                  minWidth: '32px',
                  padding: '0',
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
                  minHeight: '32px',
                  minWidth: '32px',
                  padding: '0',
                }}
                variant="contained"
                color="secondary"
              >
                <img src={rightIcon} alt={rightIcon}></img>
              </Button>
            </Grid>
          </Grid>
        </>
      )}
      <StyledLabel
        control={
          <Checkbox
            icon={CheckboxIcon}
            checkedIcon={CheckboxIconChecked}
            name="loop"
            onChange={handleToggle}
          />
        }
        label="Video Timeline"
      />
    </div>
  );
};

export default React.memo(NavigationBar);
