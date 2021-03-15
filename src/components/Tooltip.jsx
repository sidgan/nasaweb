import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import spaceButton from '../images/space.png';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: -10,
    top: -10,
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    background: '#ffffff',
    color: theme.palette.grey[500],
  },
  spaceButton: {
    position: 'inherit',
    top: '27vh',
    width: '16.5vw',
  },
  header: {
    padding: '1rem',
    paddingLeft: '0px',
    fontSize: '20px',
    lineHeight: '26px',
  },
  subHeader: {
    paddingBottom: '1rem',
    fontSize: '12px',
    lineHeight: '14px',
    letterSpacing: '0.01em',
    textTransform: 'uppercase',
  },
  content: {
    height: '55px',
    textAlign: 'center',
    borderRadius: '4px',
    background: 'rgba(71, 78, 116, 0.3)',
    padding: '8px',
  },
  contentText: {
    fontFamily: 'Roboto Condensed',
    fontWeight: 400,
    letterSpacing: '0.01em',
    lineHeight: '14px',
    fontSize: '0.7em',
  },
  contentValue: {
    fontFamily: 'Roboto Mono',
    fontSize: '16px',
    lineHeight: '21px',
    textAlign: 'center',
  },
});

const DataTooltip = withStyles(styles)((props) => {
  const [url] = useState(
    `https://www.meteorshowers.org/view/iau-${props.meteor.iau}`
  );
  const handleRedirect = () => {
    window.location.href = url;
  };

  const { classes } = props;
  return (
    <React.Fragment>
      <div className="container data-tooltip">
        <Grid container color="secondary" spacing={1}>
          <Grid item xs={12}>
            <div className="text-left">
              <div className={classes.header}>
                <b>{props.meteor.name}</b>
              </div>
              <div className={classes.subHeader}>[{props.meteor.iau}]</div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.content}>
              <p className={classes.contentText}>VELOCITY</p>
              <b className={classes.contentValue}>
                {props.meteor.velocg.toFixed(2)}
              </b>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.content}>
              <p className={classes.contentText}>SOLAR LONGITUDE</p>
              <b className={classes.contentValue}>
                {props.meteor.sol.toFixed(2)}
              </b>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.content}>
              <p className={classes.contentText}>ECLIPTIC LONGITUDE</p>
              <b className={classes.contentValue}>
                {props.meteor.lng.toFixed(2)}
              </b>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.content}>
              <p className={classes.contentText}>ECLIPTIC LATITUDE</p>
              <b className={classes.contentValue}>
                {props.meteor.lat.toFixed(2)}
              </b>
            </div>
          </Grid>
          <Grid item xs={12}>
            <IconButton
              aria-label="close"
              className={classes.spaceButton}
              onClick={handleRedirect}
            >
              <img src={spaceButton} alt={spaceButton}></img>
            </IconButton>
          </Grid>
          {/* <p></p> */}

          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={props.handleClose}
          >
            <CloseIcon />
          </IconButton>
        </Grid>
      </div>
    </React.Fragment>
  );
});

export default React.memo(DataTooltip);
