import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import './timeline.css';

const getPercentage = (current, max) => (100 * current) / max;

const getLeft = percentage => `calc(${percentage}% - 4.5px)`

const Slider = ({ start, end }) => {
  const sliderRef = React.useRef();
  const thumbRef = React.useRef();

  const diff = React.useRef();

  const handleMouseMove = (e) => {
    let newX = 
      e.clientX -
      diff.current -
      sliderRef.current.getBoundingClientRect().left;

    const end = sliderRef.current.offsetWidth - thumbRef.current.offsetWidth;
    const start = 0;
    if (newX < start) 
      newX = 0;
    if (newX > end)
      newX = end;

    const newPercentage = getPercentage(newX, end);
    thumbRef.current.style.left = getLeft(newPercentage);
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
      <div class="slider" ref={sliderRef}>
        <div class="thumb" ref={thumbRef} onMouseDown={handleMouseDown}>
          <div class="thumb-tick"></div>
        </div>
      </div>
    </>
  );
};

const Timeline = (props) => {

  const playStyle = {
      height: "40px",
      width: "40px",
      minWidth: "40px",
  }

  return (
    <div className="timeline-container">
      <div className="timeline">
        <Button style={playStyle}>
          <div className="play-icon"></div>
        </Button>
        <Slider />
      </div>
    </div>
  );
};

export default React.memo(Timeline);