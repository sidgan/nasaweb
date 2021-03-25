import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import Helper from './Helper';
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
        <Grid item>
          <React.Fragment>
            {this.state.showHelper ? (
              <Helper
                handleClose={() => this.setState({ showHelper: false })}
              />
            ) : null}
          </React.Fragment>
          <Button
            style={{ minHeight: '50px', minWidth: '50px', fontSize: '20px' }}
            variant="contained"
            color="secondary"
            onClick={() => this.setState({ showHelper: true })}
          >
            <b>?</b>
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default GroupedButton;
