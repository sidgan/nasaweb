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
    width: '250px',
    maxHeight: 480,
    marginLeft: '10px',
    border: '2px solid #474E74',
    zIndex: 999,
    bottom: '5vh',
    right: '17vw',
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

const AboutTooltip = withStyles(styles)((props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Grid container color="secondary" spacing={2}>
        <Grid item xs={12}>
          <div className="text-left">
            <p></p>
            <Typography variant="h3" color="textPrimary">
              <b>Website Created By</b>
            </Typography>

            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/alfredemmanuelinyang/"
            >
              <Typography variant="h5" color="textPrimary">
                Alfred Emmanuel Inyang
              </Typography>
            </a>

            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/chadroffey/"
            >
              <Typography variant="h5" color="textPrimary">
                Chad Roffey
              </Typography>
            </a>

            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/chichengren/"
            >
              <Typography variant="h5" color="textPrimary">
                Chicheng Ren
              </Typography>
            </a>

            {/* <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/alfredemmanuelinyang/"
            >
              <Typography variant="h5" color="textPrimary">
                Deepesh Aggarwal
              </Typography>
            </a> */}

            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/jesselash/"
            >
              <Typography variant="h5" color="textPrimary">
                Jesse Lash
              </Typography>
            </a>

            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/julia-nguyen-b592a1193/"
            >
              <Typography variant="h5" color="textPrimary">
                Julia Nguyen
              </Typography>
            </a>

            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/meherkasam/"
            >
              <Typography variant="h5" color="textPrimary">
                Meher Anand Kasam
              </Typography>
            </a>

            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/sahyadri-krishna/"
            >
              <Typography variant="h5" color="textPrimary">
                Sahyadri Krishna
              </Typography>
            </a>

            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/sidgan/"
            >
              <Typography variant="h5" color="textPrimary">
                Siddha Ganju
              </Typography>
            </a>
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

export default React.memo(AboutTooltip);
