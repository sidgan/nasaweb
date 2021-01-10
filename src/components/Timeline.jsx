import { doc } from 'prettier';
import React, { useState } from 'react';
import './timeline.css';

const getPercentage = (current, max) => (100 * current) / max;

const getLeft = percentage => `calc(${percentage}% - 4.5px)`

const Slider = (props) => {
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
        <div class="thumb" ref={thumbRef} onMouseDown={handleMouseDown}></div>
      </div>
    </>
  );
};

const Timeline = (props) => {
  return (
    <div class="timeline-container">
      <div class="timeline">
        <Slider />
      </div>
    </div>
  );
};

export default React.memo(Timeline);
