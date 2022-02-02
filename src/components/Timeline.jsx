import React, { useEffect } from 'react';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { useNavigationState } from '../contexts/navigation';
import { getNextDate, dateDiff, calculateNewDate } from '../utils/date';
import Preloader from './Preloader';

import PlayIcon from '../images/play.png';
import PauseIcon from '../images/Pause.png';
import DownloadIcon from '../images/Download.png';

const getPercentage = (current, max) => (100 * current) / max;

const Slider = ({ enabled, currentPosition, onChange }) => {
  const sliderRef = React.useRef();
  const thumbRef = React.useRef();
  const progressRef = React.useRef();

  const diff = React.useRef();

  // change thumb position if currentPosition is received
  useEffect(() => {
    if (currentPosition === null) {
      return;
    }
    thumbRef.current.style.left = `${Math.trunc(currentPosition)}px`;
    progressRef.current.style.width = `${Math.trunc(currentPosition)}px`;
  }, [currentPosition]);

  const moveThumb = (newX, offsetX) => {
    const sliderWidth = sliderRef.current.offsetWidth;
    const end = sliderWidth - thumbRef.current.offsetWidth;
    const start = 0;
    if (newX < start) newX = 0;
    if (newX > end) newX = end;

    const newPercentage = getPercentage(newX, end);
    const newPosition = (sliderWidth / 100) * newPercentage;
    thumbRef.current.style.left = `calc(${newPercentage}% - ${offsetX})`;
    progressRef.current.style.width = `calc(${newPercentage}% - ${offsetX})`;
    onChange(newPosition);
  };

  const handleSliderClick = (e) => {
    if (enabled) {
      let newX = e.clientX - sliderRef.current.getBoundingClientRect().left;

      const offsetX = '9px';
      moveThumb(newX, offsetX);
    }
  };

  const handleMouseMove = (e) => {
    let newX =
      e.clientX - diff.current - sliderRef.current.getBoundingClientRect().left;

    const offsetX = '4.5px';
    moveThumb(newX, offsetX);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mousemove', handleMouseMove);
  };

  const handleMouseDown = (e) => {
    if (enabled) {
      diff.current = e.clientX - thumbRef.current.getBoundingClientRect().left;
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };

  const classes = useStyles();
  return (
    <>
      <div
        className={classes.slider}
        ref={sliderRef}
        onClick={handleSliderClick}
      >
        <div className={classes.progress} ref={progressRef}></div>
        <div
          className={classes.thumb}
          ref={thumbRef}
          onMouseDown={handleMouseDown}
        ></div>
      </div>
    </>
  );
};

function useInterval(callback, isPlaying) {
  const savedCallback = React.useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (!isPlaying) {
      return;
    }
    let id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [isPlaying]);
}

const Timeline = () => {
  const {
    isInTimelineView,
    startDate,
    endDate,
    timelineLoading,
    setGlobeMarkers,
    source,
  } = useNavigationState();
  const [current, setCurrent] = React.useState({
    date: startDate,
    daysPassed: 0,
  });

  const [isSliderEnabled, setSliderEnabled] = React.useState(false);
  const [isPlaying, setPlayState] = React.useState(false);

  const [sliderPosition, setPosition] = React.useState(0);

  // reset slider
  useEffect(() => {
    setCurrent({ date: startDate, daysPassed: 0 });
    setPosition(0);
  }, [isInTimelineView, startDate, endDate]);

  useEffect(() => {
    switch (timelineLoading) {
      case 'not set':
      case 'loading':
        setSliderEnabled(false);
        break;
      case 'finished':
        setSliderEnabled(true);
        break;
      default:
    }
  }, [timelineLoading]);

  // disable slider upon source or start date change
  useEffect(() => {
    setSliderEnabled(false);
  }, [startDate, source, isInTimelineView]);

  useInterval(() => {
    const currentDate = current.date;
    if (currentDate === endDate) {
      setPlayState(false);
    } else {
      const nextDate = getNextDate(currentDate);
      const newDaysPassed = current.daysPassed + 1;
      setGlobeMarkers(nextDate);
      setCurrent({ date: nextDate, daysPassed: newDaysPassed });
      const newPos =
        (newDaysPassed / dateDiff(new Date(startDate), new Date(endDate))) *
        687;
      setPosition(newPos);
    }
  }, isPlaying);

  function pauseTimeline() {
    setPlayState(false);
  }

  const startPlay = () => {
    if (current.date === endDate) {
      setCurrent({ date: startDate, daysPassed: 0 });
      setGlobeMarkers(startDate);
      setPosition(0);
    } else {
      setGlobeMarkers(current.date);
    }
    setPlayState(true);
  };

  const handleSliderChange = (newPosition) => {
    if (isPlaying) {
      pauseTimeline();
    }
    const totalNumDays = dateDiff(new Date(startDate), new Date(endDate));
    const newDaysPassed = Math.trunc((newPosition / 696) * totalNumDays);
    const newCurrentDate = calculateNewDate(new Date(startDate), newDaysPassed);
    setGlobeMarkers(newCurrentDate);
    setCurrent({ date: newCurrentDate, daysPassed: newDaysPassed });
  };

  const classes = useStyles();

  const renderPlay = () => {
    if (isPlaying) {
      return (
        <Button className={classes.playButton} onClick={pauseTimeline}>
          <div className={classes.pauseIcon}></div>
        </Button>
      );
    } else {
      switch (timelineLoading) {
        case 'loading':
          return (
            <div className={classes.spinner}>
              <Preloader size={24} />
            </div>
          );
        case 'not loaded':
        case 'finished':
          return (
            <Button
              className={classes.playButton}
              onClick={() => {
                if (isSliderEnabled) {
                  startPlay();
                }
              }}
            >
              <div className={classes.playIcon}></div>
            </Button>
          );
        default:
          return (
            <Button className={classes.playButton} onClick={() => {}}>
              <div className={classes.playIcon}></div>
            </Button>
          );
      }
    }
  };

  const renderTimelineView = () => {
    if (isInTimelineView) {
      return (
        <div className={classes.timeline}>
          {renderPlay()}
          <Slider
            enabled={isSliderEnabled}
            onChange={handleSliderChange}
            currentPosition={sliderPosition}
          />
          <div className={classes.currentDate}>{current.date}</div>
          <div className={classes.downloadIcon}></div>
        </div>
      );
    }
  };

  return renderTimelineView();
};

export default React.memo(Timeline);

const useStyles = makeStyles({
  timeline: {
    margin: '0 auto',
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'left',
    backgroundColor: 'rgb(71, 78, 116, 0.3)',
    padding: '16px 24px 16px 16px',
    borderRadius: '4px',
  },
  playButton: {
    height: '32px',
    width: '32px',
    minWidth: '32px',
    margin: '0 20px 0 0',
    backgroundColor: 'rgb(25, 200, 255, 1)',
  },
  playIcon: {
    width: '11px',
    height: '16px',
    backgroundImage: `url(${PlayIcon})`,
  },
  pauseIcon: {
    width: '16px',
    height: '16px',
    backgroundImage: `url(${PauseIcon})`,
  },
  spinner: {
    width: '32px',
    height: '32px',
    margin: '0 20px 0 0',
  },
  currentDate: {
    color: '#fff',
    fontSize: 12,
    margin: '0 16px',
  },
  downloadIcon: {
    width: '16px',
    height: '16px',
    backgroundImage: `url(${DownloadIcon})`,
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
      width: '696px',
    },
  },
  progress: {
    position: 'relative',
    top: '0',
    width: '0',
    height: '2px',
    background: '#19c8ff',
    transition: 'width 0.5s linear',
  },
  thumb: {
    width: '9px',
    height: '9px',
    borderRadius: '1px',
    position: 'relative',
    top: '-5px',
    cursor: 'pointer',
    background: '#19c8ff',
    transition: 'left 0.5s linear',
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
      borderRadius: '5px',
    },
  },
});
