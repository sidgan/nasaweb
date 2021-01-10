import React, { useState } from 'react';
import './timeline.css';

const Slider = (props) => {
    return (
      <>
        <div class="slider">
          <div class="thumb"></div>
        </div>
      </>
    );
  }

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
