import React from 'react';
import DatePicker from './DatePicker';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PlayIcon from '../images/play icon.png';
import Checkmark from '../images/Checkmark.png';
import './timeline.css';

const useStyles = makeStyles({
  timeline: {
    margin: '0 auto',
    display: 'grid',
    width: 'fit-content',
    gridTemplateRows: '40px 50px',
    rowGap: '30px',
    alignItems: 'center'
  },
  row1: {
    display: 'flex',
    alignItems: 'center'
  },
  row2: {
    display: 'grid',
    gridTemplateColumns: '40px 1fr 2fr 1fr',
    gridTemplateAreas: 
      '"space start loop end"',
    height: 'fit-content',
    alignItems: 'center'
  },
  loop: {
    justifySelf: 'start',
    color: '#fff',
    gridArea: 'loop'
  },
  icon: {
    width: 16,
    height: 16,
    background: 'rgba(71, 78, 116, 0.6)',
    backdropFilter: 'blur(16px)',
    borderRadius: '2px'
  },
  checked: {
    backgroundImage: `url(${Checkmark})`
  },
  start: {
    gridArea: 'start',
    position: 'relative',
    '&:before': {
      content: "'Start Date'",
      position: 'absolute',
      bottom: '105%',
      fontFamily: 'Roboto Mono',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '12px',
      lineHeight: '16px',
      textTransform: 'uppercase',
      color: '#fff'
    }
  },
  end: {
    justifySelf: 'end',
    gridArea: 'end',
    position: 'relative',
    '&:before': {
      content: "'End Date'",
      position: 'absolute',
      bottom: '105%',
      fontFamily: 'Roboto Mono',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '12px',
      lineHeight: '16px',
      textTransform: 'uppercase',
      color: '#fff'
    }
  },
  playButton: {
    height: "40px",
    width: "40px",
    minWidth: "40px",
    margin: "0 20px 0 0"
  },
  playIcon: {
    width: '40px',
    height: '19px',
    backgroundImage: `url(${PlayIcon})`
  }
});

const getPercentage = (current, max) => (100 * current) / max;

const Slider = () => {
  const sliderRef = React.useRef();
  const thumbRef = React.useRef();

  const diff = React.useRef();

  const moveThumb = (newX, offsetX) => {
    const end = sliderRef.current.offsetWidth - thumbRef.current.offsetWidth;
    const start = 0;
    if (newX < start) 
      newX = 0;
    if (newX > end)
      newX = end;

    const newPercentage = getPercentage(newX, end);
    thumbRef.current.style.left = `calc(${newPercentage}% - ${offsetX})`;
  }

  const handleSliderClick = (e) => {
    let newX = 
      e.clientX -
      sliderRef.current.getBoundingClientRect().left;
    
    const offsetX = '9px';
    moveThumb(newX, offsetX);
  }

  const handleMouseMove = (e) => {
    let newX = 
      e.clientX -
      diff.current -
      sliderRef.current.getBoundingClientRect().left;

    const offsetX = '4.5px';
    moveThumb(newX, offsetX);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mousemove', handleMouseMove);
  };

  const handleMouseDown = (e) => {
    diff.current = 
      e.clientX - thumbRef.current.getBoundingClientRect().left;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <>
      <div className="slider" ref={sliderRef} onClick={handleSliderClick}>
        <div className="thumb" ref={thumbRef} onMouseDown={handleMouseDown}></div>
      </div>
    </>
  );
};

const StyledLabel = withStyles({
  label: {
    fontSize: "16px",
    color: "rgba(255, 255, 255, 0.8)"
  }
})(FormControlLabel);


const Timeline = () => {

  const [loop, setLoop] = React.useState(false);

  const toggleLoop = () => {
    setLoop(!loop);
  };

  const classes = useStyles();

  const CheckboxIcon = (
    <div className={classes.icon}></div>
  );
  
  const CheckboxIconChecked = (
    <div className={classnames(classes.icon, classes.checked)}></div>
  );

  return (
    <div className={classes.timeline}>
      <div className={classes.row1}>
        <Button className={classes.playButton}>
          <div className={classes.playIcon}></div>
        </Button>
        <Slider />
      </div>
      <div className={classes.row2}>
        <div className={classes.start}>
          <DatePicker showArrows={false} />
        </div>
        <div className={classes.loop}>
          <StyledLabel
            control={
              <Checkbox
                icon={CheckboxIcon}
                checkedIcon={CheckboxIconChecked}
                checked={loop}
                name="loop"
                onChange={toggleLoop}
              />
            }
            label="Loop Video"
          />
        </div>
        <div className={classes.end}>
          <DatePicker showArrows={false} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Timeline);