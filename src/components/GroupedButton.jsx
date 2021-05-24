import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
class GroupedButton extends Component {
  constructor() {
    super();
    this.state = {
      showHelper: false,
    };
  }
  render() {
    return (
      <Grid container spacing={2}>
        <Grid item>
          {this.props.showGlobe ? (
            <ButtonGroup
              size="large"
              style={{ maxHeight: '50px', minHeight: '50px' }}
            >
              <Button variant="contained" color="primary">
                <Typography variant="h4" color="textSecondary">
                  Sphere
                </Typography>
              </Button>

              <Button
                variant="contained"
                color="secondary"
                onClick={this.props.toggleDisplay}
              >
                <Typography variant="h4" color="textSecondary">
                  Table
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
                onClick={this.props.toggleDisplay}
              >
                <Typography variant="h4" color="textSecondary">
                  Sphere
                </Typography>
              </Button>

              <Button variant="contained" color="primary">
                <Typography variant="h4" color="textPrimary">
                  Table
                </Typography>
              </Button>
            </ButtonGroup>
          )}
        </Grid>
      </Grid>
    );
  }
}

export default GroupedButton;
