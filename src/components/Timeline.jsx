import React from 'react';
import DatePicker from './DatePicker';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import PlayIcon from '../images/play icon.png';
import Checkmark from '../images/Checkmark.png';

import TimelineContext from '../contexts/timeline';

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
  loopLabel: {
    fontSize: "16px",
    color: "rgba(255, 255, 255, 0.8)"
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
  },
  slider: {
    position: 'relative',
    width: '696px',
    height: '2px',
    margin: '0 auto',
    background: 'rgba(255, 255, 255, 0.6)',
    boxShadow: '0px 1px 6px rgba(255, 255, 255, 0.3)',
    borderRadius: '4px',
    '&:before': {
      content: "''",
      position: 'absolute',
      top: '-8px',
      left: 0,
      height: '20px',
      width: '696px'
    }
  },
  thumb: {
    width: '9px',
    height: '9px',
    borderRadius: '1px',
    position: 'relative',
    top: '-3.5px',
    cursor: 'pointer',
    background: '#19c8ff',
    boxShadow: '0px 0px 14px rgba(255, 255, 255, 0.45)',
    '&:after': {
      content: "''",
      position: 'absolute',
      top: '-8px',
      left: 'calc(50% - 1.5px)',
      width: '3px',
      height: '25px',
      background: '#19C8FF',
      boxShadow: '0px 0px 14px rgba(255, 255, 255, 0.45)',
      borderRadius: '5px'
    }
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

  const classes = useStyles();

  return (
    <>
      <div className={classes.slider} ref={sliderRef} onClick={handleSliderClick}>
        <div className={classes.thumb} ref={thumbRef} onMouseDown={handleMouseDown}></div>
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
  const startDate = React.useContext(TimelineContext).startDate;
  const endDate = React.useContext(TimelineContext).endDate;
  const [loop, setLoop] = React.useState(false);

  const setStartDate = React.useContext(TimelineContext).changeStartDate;
  const setEndDate = React.useContext(TimelineContext).changeEndDate;

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
          <DatePicker 
            showArrows={false} 
            selectedDate={startDate}
            onDateChange={setStartDate}
          />
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
          <DatePicker 
            showArrows={false} 
            selectedDate={endDate}
            onDateChange={setEndDate}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Timeline);