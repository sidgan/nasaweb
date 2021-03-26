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

const options = {
  'ALL LOCATIONS': 'ALL',
  Archive: 'ARCHIVE',
  Arkansas: 'AR',
  Australia: 'AUS',
  California: 'CAMS',
  Brazil: 'EXOSS',
  'Global Meteor Network': 'GMN',
  Maryland: 'MA',
  'North California': 'NCA',
  Texas: 'TEXAS',
  'United Arad Emirates': 'UAE',
  Netherlands: 'BENELUX',
  Chile: 'CHILE',
  Europe: 'EDMOND',
  Florida: 'FL',
  Arizona: 'LOCAMS',
  Namibia: 'NAMIBIA',
  'New Zealand': 'NZ',
  'South Africa': 'SA',
  Japan: 'SONOTACO',
  Turkey: 'TK',
};

const StationSelect = ({ source, changeSource }) => {
  const classes = useStyles();

  const handleChange = (event) => {
    changeSource(event.target.value);
  };

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <Select
        native
        style={{
          backgroundColor: 'secondary',
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
        {Object.entries(options).map(([key, value]) => (
          <option
            style={{
              backgroundColor: 'rgba(71, 78, 116, 0.8)',
              borderRadius: '4px',
              opacity: '0.2',
              fontSize: '14px',
            }}
            value={value}
            key={key}
          >
            {key}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default React.memo(StationSelect);
