import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

class ZoomButton extends Component {
  state = {};
  render() {
    return (
      <Grid container>
        <Grid item>
          <ButtonGroup
            orientation="vertical"
            color="primary"
            aria-label="vertical contained primary button group"
            variant="contained"
          >
            <Button
              variant="contained"
              color="secondary"
              style={{
                minWidth: '40px',
                minHeight: '40px',
                lineHeight: '30px',
                fontSize: '20px',
                marginBottom: '2px',
              }}
              onClick={this.props.onZoomIn}
            >
              <b>+</b>
            </Button>

            <Button
              variant="contained"
              color="secondary"
              style={{
                minWidth: '40px',
                minHeight: '40px',
                lineHeight: '30px',
                fontSize: '20px',
                marginTop: '2px',
              }}
              onClick={this.props.onZoomOut}
            >
              <b>-</b>
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  }
}

export default ZoomButton;
