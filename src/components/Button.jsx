import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import { theme } from '../theme';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function Button(props) {
  const classes = useStyles();

  return (
    <div>
      <Fab
        variant="extended"
        color="primary"
        aria-label="add"
        className={classes.margin}
        onClick={props.onClick}
      >
        <NavigationIcon className={classes.extendedIcon} />
        {props.children}
      </Fab>
    </div>
  );
}

export default Button;
