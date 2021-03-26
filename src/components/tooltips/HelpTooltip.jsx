import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const styles = (theme) => ({
  root: {
    position: 'fixed',
    backgroundColor: 'rgba(71, 78, 116, 0.6)',
    color: 'primary',
    maxWidth: 448,
    maxHeight: 480,
    marginLeft: '10px',
    border: '2px solid #474E74',
    zIndex: 999,
    bottom: '15vh',
    right: '2vw',
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
});

const HelpTooltip = withStyles(styles)((props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Grid container color="secondary" spacing={2}>
        <Grid item xs={12}>
          <div className="text-left">
            <p></p>
            <Typography variant="h3" color="textPrimary">
              <b>How To Use</b>
            </Typography>
            <Typography variant="h5" color="textPrimary">
              Place cursor in "Pick a date" window. From pop-up calendar, select
              a past date for which data are available from one of the meteor
              shower surveillance networks. Pick today's date to get table of
              active showers below interactive sphere. Rotate sphere with
              cursor. Hover over point to get the IAU stream number. Click to
              bring up a new window to see that shower in space.
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="text-left">
            <Typography variant="h3" color="textPrimary">
              <b>Explanation</b>
            </Typography>
            <Typography variant="h5" color="textPrimary">
              The celestial sphere shows stars in black and meteors in colors
              (showers: <span style={{ color: 'red' }}>red</span> = fast,{' '}
              <span style={{ color: 'blue' }}>blue</span> = slow) or{' '}
              <b>white</b> (non-showers). Each dot is the direction from which a
              meteor approached (called the "radiant"), displayed in
              sun-centered ecliptic coordinates. Showers are assigned according
              to the CAMS Shower Lookup Table (10 Mb) described in this
              publication. New showers will show up as groupings of white dots.
            </Typography>
          </div>
        </Grid>

        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={props.handleClose}
        >
          <CloseIcon />
        </IconButton>
      </Grid>
    </div>
  );
});

export default React.memo(HelpTooltip);
