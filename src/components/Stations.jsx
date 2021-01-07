import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme) => ({
  formControl: {
    fontFamily: "Roboto Mono",
    fontSize: '16px',
    lineHeight: '16px',
    fontWeight: '500'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
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

export default function NativeSelects(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
      age: '',
      name: 'hai',
    });
  
    const handleChange = (event) => {
      const name = event.target.name;
      setState({
        ...state,
        [name]: event.target.value,
      });
      console.log(event.target.value);
      if (event.target.value === "ALL LOCATIONS") {
        props.onChange('ALL')
      } else {
        props.onChange(event.target.value)
      }
    };
  
    return (
        <div>
            <FormControl variant="outlined" className={classes.formControl}>
                <Select
                native
                style={{ backgroundColor: "rgba(71, 78, 116, 0.4)", color: 'rgba(223, 223, 236)', maxHeight: '50px', minHeight: '50px' }}
                value={state.age}
                onChange={handleChange}
                inputProps={{
                    name: 'age',
                }}
                >
                    {options.map((option) => (
                    <option style={{ backgroundColor: "rgba(71, 78, 116, 0.4)", borderRadius: "4px" }} value={option}>{option}</option>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
