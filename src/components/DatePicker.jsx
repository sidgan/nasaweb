import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import { DatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';

import { getDateString, checkIfValidDate } from '../utils/date';

const useStyles = makeStyles({
  input: {
    background: 'transparent',
    width: 200,
  },
  picker: {
    fontSize: '32px',
  },
});

const getOffsetDate = (date) => {
  const dt = new Date(date);
  return new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000);
};

const CustomDatePicker = ({ selectedDate, onChange, minDate, maxDate }) => {
  const handleDateChange = (date) => {
    if (checkIfValidDate(date, maxDate)) {
      const newdf = getDateString(date);
      onChange(newdf);
    }
  };

  const classes = useStyles();

  return (
    <FormControl variant="filled">
      <DatePicker
        disableToolbar
        variant="inline"
        className={classes.picker}
        InputProps={{
          classes: { root: classes.input, input: classes.picker },
        }}
        PopoverProps={{
          anchorOrigin: { horizontal: 'left', vertical: 'top' },
          transformOrigin: { horizontal: 325, vertical: 0 },
        }}
        format="yyyy-MM-dd"
        value={getOffsetDate(selectedDate)}
        onChange={handleDateChange}
        allowKeyboardControl={false}
        minDate={getOffsetDate(minDate)}
        maxDate={maxDate}
        invalidLabel="Select"
        invalidDateMessage=""
        labelFunc={(date, invalidLabel) => {
          if (getOffsetDate(selectedDate).toString() !== 'Invalid Date') {
            return getDateString(date);
          } else {
            console.log('invalid!');
            return invalidLabel;
          }
        }}
      />
    </FormControl>
  );
};

export default React.memo(CustomDatePicker);
