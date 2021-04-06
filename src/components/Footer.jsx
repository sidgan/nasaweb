import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SpaceMl from '../images/spaceml.png';

const AboutTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: 'rgba(71, 78, 116, 0.6)',
    color: 'primary',
    maxWidth: 300,
    maxHeight: 500,
    marginLeft: '10px',
    border: '2px solid #474E74',
  },
}))(Tooltip);

const AboutCard = () => {
  return (
    <React.Fragment>
      <Grid container color="secondary" spacing={2}>
        <Grid item xs={12}>
          <div className="text-left">
            <p></p>
            <Typography variant="h3" color="textPrimary">
              <b>Website Created By;</b>
            </Typography>
            <Typography variant="h5" color="textPrimary">
              Alfred Emmanuel
            </Typography>
            <Typography variant="h5" color="textPrimary">
              Chad Roffey
            </Typography>
            <Typography variant="h5" color="textPrimary">
              Chicheng Ren
            </Typography>
            <Typography variant="h5" color="textPrimary">
              Deepesh Aggarwal
            </Typography>
            <Typography variant="h5" color="textPrimary">
              Jesse Lash
            </Typography>
            <Typography variant="h5" color="textPrimary">
              Julia Nguyen
            </Typography>
            <Typography variant="h5" color="textPrimary">
              Meher Anand Kasam
            </Typography>
            <Typography variant="h5" color="textPrimary">
              Sahyadri Krishna
            </Typography>
            <Typography variant="h5" color="textPrimary">
              Siddha Ganju
            </Typography>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

class Footer extends Component {
  state = {};

  render() {
    return (
      <div className="footer">
        <div className="footer-credit">
          <p className="footer-credit-section">
            Built by:
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="http://spaceml.org/"
            >
              <img src={SpaceMl} alt={SpaceMl}></img>
            </a>
          </p>
          <p className="footer-credit-section">
            Hosted by:
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.seti.org"
            >
              The SETI Institute
            </a>
          </p>
          <p className="footer-credit-section">
            Curator:
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.seti.org/our-scientists/peter-jenniskens"
            >
              Peter Jenniskens
            </a>
          </p>
        </div>

        <div className="footer_nav">
          <div className="footer-nav-link">
            <AboutTooltip title={<AboutCard />}>
              <p>About</p>
            </AboutTooltip>
          </div>
        </div>
      </div>
    );
  }
}

// export default Responsive(Footer);
export default Footer;
