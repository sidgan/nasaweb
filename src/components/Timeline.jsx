import React from 'react';
import DatePicker from './DatePicker';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import './timeline.css';

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

const CheckboxIcon = (
  <div className="icon"></div>
);

const CheckboxIconChecked = (
  <div className="icon checked"></div>
);

const Timeline = () => {

  const [loop, setLoop] = React.useState(false);

  const playStyle = {
    height: "40px",
    width: "40px",
    minWidth: "40px",
    margin: "0 20px 0 0"
  }

  const toggleLoop = () => {
    setLoop(!loop);
  };

  return (
    <div className="timeline-container">
      <div className="timeline">
        <div className="row-1">
          <Button style={playStyle}>
            <div className="play-icon"></div>
          </Button>
          <Slider />
        </div>
        <div className="row-2">
          <div className="start">
            <DatePicker showArrows={false} />
          </div>
          <div className="loop">
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
          <div className="end">
            <DatePicker showArrows={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Timeline);