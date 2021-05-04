import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Helper from './Helper';

class InfoPopper extends Component {
  constructor() {
    super();
    this.state = {
      showHelper: false,
    };
  }
  render() {
    return (
      <Grid>
        <React.Fragment>
          {this.state.showHelper ? (
            <Helper handleClose={() => this.setState({ showHelper: false })} />
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
    );
  }
}

export default InfoPopper;
