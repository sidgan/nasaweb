import { doc } from 'prettier';
import React, { useState } from 'react';
import './timeline.css';

const Slider = (props) => {
  const sliderRef = React.useRef();
  const thumbRef = React.useRef();

  const handleMouseMove = (e) => {
    console.log("mouse moved");
  };

  const handleMouseUp = () => {
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mousemove', handleMouseMove);
  };

  const handleMouseDown = (e) => {
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
