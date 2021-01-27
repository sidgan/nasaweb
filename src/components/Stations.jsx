import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    fontFamily: 'Roboto Mono',
    fontStyle: 'normal',
    fontSize: '16px',
    lineHeight: '16px',
    fontWeight: '500',
  },
}));

const options = [
  'ALL LOCATIONS',
  'ARCHIVE',
  'AR',
  'AUS',
  'CAMS',
  'EXOSS',
  'GMN',
  'MA',
  'NCA',
  'TEXAS',
  'UAE',
  'BENELUX',
  'CHILE',
  'EDMOND',
  'FL',
  'LOCAMS',
  'NAMIBIA',
  'NZ',
  'SA',
  'SONOTACO',
  'TK',
];

const StationSelect = ({ source, changeSource }) => {
  const classes = useStyles();

  const handleChange = (event) => {
    if (event.target.value === 'ALL LOCATIONS') {
      changeSource('ALL');
    } else {
      changeSource(event.target.value);
    }
  };

  return (
<<<<<<< HEAD
    <FormControl variant="outlined" className={classes.formControl}>
      <Select
        native
        style={{
          backgroundColor: 'rgba(71, 78, 116, 0.4)',
          color: 'rgba(223, 223, 236)',
          height: '50px',
          width: '200px',
        }}
        value={source}
        onChange={handleChange}
        inputProps={{
          name: 'age',
        }}
      >
        {options.map((option) => (
          <option
            style={{
              backgroundColor: 'rgba(71, 78, 116, 0.4)',
              borderRadius: '4px',
            }}
            value={option}
            key={option}
          >
            {option}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default React.memo(StationSelect);
