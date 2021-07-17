import React from 'react';
import Button from '@material-ui/core/Button';
import GlobeOptimized from './GlobeOptimized';
import { useNavigationState } from '../contexts/navigation';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import logo from '../images/logo.svg';
import SpaceMl from '../images/spaceml.png';

const VideoView = () => {
  const { date } = useNavigationState();

  const classes = useStyles();
  let headerClass = `flexbox_container ${classes.header}`;
  let titleClass = `title_item ${classes.title}`;

  return (
    <div className={classes.container}>
      <div className={headerClass}>
        <div className={titleClass}>
          <a
            className="logo_item"
            target="_blank"
            rel="noopener noreferrer"
            href="http://cams.seti.org"
          >
            <img src={logo} alt="NASA" width="40px" height="40px" />
          </a>
          Meteor Shower Portal
        </div>
        <StyledButton>{date}</StyledButton>
      </div>
      <GlobeOptimized />
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
        </div>
      </div>
    </div>
  );
};

export default VideoView;

const StyledButton = withStyles({
  root: {
    fontSize: '16px',
  },
})(Button);

const useStyles = makeStyles({
  container: {
    position: 'relative',
    height: '100vh',
    width: '100vh',
    margin: 'auto',
  },
  header: {
    position: 'absolute',
    padding: '20px 24px 0 24px',
  },
  title: {
    marginLeft: '0',
  },
});
