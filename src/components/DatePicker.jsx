import React from 'react';
import { DatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';

import { getDateString, checkIfValidDate } from '../utils/date';

const getOffsetDate = (date) => {
  const dt = new Date(date);
  return new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000);
};

const CustomDatePicker = ({
  selectedDate,
  onChange,
  minDate,
  maxDate,
  onClose,
}) => {
  const handleDateChange = (date) => {
    date.setHours(0);
    if (checkIfValidDate(date, getOffsetDate(maxDate))) {
      const newdf = getDateString(date);
      onChange(newdf);
    }
  };

  const classes = useStyles();

  return (
    <DatePicker
      disableToolbar
      variant="inline"
      InputProps={{ classes }}
      PopoverProps={{
        anchorOrigin: { horizontal: 'left', vertical: 'top' },
        transformOrigin: { horizontal: 325, vertical: 0 },
      }}
      format="yyyy-MM-dd"
      value={getOffsetDate(selectedDate)}
      onChange={handleDateChange}
      onClose={onClose}
      allowKeyboardControl={false}
      minDate={getOffsetDate(minDate)}
      maxDate={maxDate}
      invalidLabel="Select"
      invalidDateMessage=""
      labelFunc={(date, invalidLabel) => {
        if (getOffsetDate(selectedDate).toString() !== 'Invalid Date') {
          return getDateString(date);
        } else {
          return invalidLabel;
        }
      }}
    />
  );
};

export default React.memo(CustomDatePicker);

const useStyles = makeStyles({
  root: {
    background: 'transparent',
    width: 160,
  },
  input: {
    fontSize: '26px',
  },
  underline: {
    '&&&:before': {
      bottom: '5px',
      borderBottom: '1px solid white',
    },
    '&&:after': {
      bottom: '5px',
      borderBottom: '1px solid white',
    },
  },
});
