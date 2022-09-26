import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';

const ViewToggler = (props) => {
  return (
    <Grid>
      <Grid item>
        {props.showGlobe ? (
          <ButtonGroup
            size="large"
            style={{ maxHeight: '50px', minHeight: '50px' }}
          >
            <Button variant="contained" color="primary">
              <Typography variant="h4" color="textSecondary">
                Sphere
              </Typography>
            </Button>
          </ButtonGroup>
        ) : (
          <ButtonGroup
            size="large"
            style={{ maxHeight: '50px', minHeight: '50px' }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={props.toggleDisplay}
            >
              <Typography variant="h4" color="textSecondary">
                Sphere
              </Typography>
            </Button>
          </ButtonGroup>
        )}
      </Grid>
    </Grid>
  );
};

export default ViewToggler;
