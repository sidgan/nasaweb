import React from 'react';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { useNavigationState } from '../contexts/navigation';

import PlayIcon from '../images/play.png';
import PauseIcon from '../images/Pause.png';
import DownloadIcon from '../images/Download.png';

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
      borderRadius: '5px',
    },
  },
});

const getPercentage = (current, max) => (100 * current) / max;

const Slider = ({ enabled, currentPosition, onChange }) => {
  const sliderRef = React.useRef();
  const thumbRef = React.useRef();

  const diff = React.useRef();

  // change thumb position if currentPosition is received
  // useEffect(() => {
  //   if (currentPosition === null) {
  //     return;
  //   }
  //   console.log('current position', Math.trunc(currentPosition));
  //   thumbRef.current.style.left = `${Math.trunc(currentPosition)}px`;
  // }, [currentPosition]);

  // const moveThumb = (newX, offsetX) => {
  //   const sliderWidth = sliderRef.current.offsetWidth;
  //   const end = sliderWidth - thumbRef.current.offsetWidth;
  //   const start = 0;
  //   if (newX < start) newX = 0;
  //   if (newX > end) newX = end;

  //   const newPercentage = getPercentage(newX, end);
  //   console.log(newPercentage);
  //   const newPosition = (sliderWidth / 100) * newPercentage;
  //   thumbRef.current.style.left = `calc(${newPercentage}% - ${offsetX})`;
  //   onChange(newPosition);
  // };

  // const handleSliderClick = (e) => {
  //   if (enabled) {
  //     let newX = e.clientX - sliderRef.current.getBoundingClientRect().left;

  //     const offsetX = '9px';
  //     moveThumb(newX, offsetX);
  //   }
  // };

  // const handleMouseMove = (e) => {
  //   let newX =
  //     e.clientX - diff.current - sliderRef.current.getBoundingClientRect().left;

  //   const offsetX = '4.5px';
  //   moveThumb(newX, offsetX);
  // };

  // const handleMouseUp = () => {
  //   document.removeEventListener('mouseup', handleMouseUp);
  //   document.removeEventListener('mousemove', handleMouseMove);
  // };

  // const handleMouseDown = (e) => {
  //   if (enabled) {
  //     diff.current = e.clientX - thumbRef.current.getBoundingClientRect().left;
  //     document.addEventListener('mousemove', handleMouseMove);
  //     document.addEventListener('mouseup', handleMouseUp);
  //   }
  // };

  const classes = useStyles();
  return (
    <>
      <div
        className={classes.slider}
        ref={sliderRef}
        // onClick={handleSliderClick}
      >
        <div
          className={classes.thumb}
          ref={thumbRef}
          // onMouseDown={handleMouseDown}
        ></div>
      </div>
    </>
  );
};

// function useInterval(callback, isPlaying) {
//   const savedCallback = React.useRef();
//   useEffect(() => {
//     savedCallback.current = callback;
//   }, [callback]);

//   useEffect(() => {
//     function tick() {
//       savedCallback.current();
//     }
//     if (!isPlaying) {
//       return;
//     }
//     let id = setInterval(tick, 1000);
//     return () => clearInterval(id);
//   }, [isPlaying]);
// }

const Timeline = () => {
  const { isInTimelineView, setGlobeMarkers, source } = useNavigationState();

  // const [startDate, setStartDate] = React.useState(getStartDate());
  // const [endDate, setEndDate] = React.useState(getYesterdaysDate());
  // const [current, setCurrent] = React.useState({});

  // const [isSliderEnabled, setSliderEnabled] = React.useState(false);
  const [isPlaying, setPlayState] = React.useState(false);

  // disable slider upon source change
  // useEffect(() => {
  //   setSliderEnabled(false);
  // }, [source]);

  // useInterval(() => {
  //   console.log('moved');
  //   console.log('current date b4 conditionals: ', current.date);
  //   const currentDate = current.date;
  //   console.log('current date: ', currentDate, '; end date: ', endDate);
  //   if (currentDate === endDate) {
  //     if (!isLooping) {
  //       console.log('stopped');
  //       setPlayState(false);
  //     } else {
  //       setCurrent({ date: startDate, daysPassed: 0 });
  //       setGlobeMarkers(startDate);
  //     }
  //   } else {
  //     const nextDate = getNextDate(currentDate);
  //     setGlobeMarkers(nextDate);
  //     setCurrent((prev) => {
  //       return { date: nextDate, daysPassed: prev.daysPassed + 1 };
  //     });
  //     console.log('change current date to ', nextDate);
  //   }
  // }, isPlaying);

  // function pauseTimeline() {
  //   console.log('paused');
  //   setPlayState(false);
  // }

  // const startPlay = () => {
  //   if (current.date === endDate) {
  //     setCurrent({ date: startDate, daysPassed: 0 });
  //     setGlobeMarkers(startDate);
  //   } else {
  //     setGlobeMarkers(current.date);
  //   }
  //   setPlayState(true);
  // };

  // const loadTimeline = async () => {
  //   await setLoadingState(true);
  //   await loadRange(startDate, endDate);
  //   await setCurrent({ date: startDate, daysPassed: 0 });
  //   setLoadingState(false);
  //   setSliderEnabled(true);
  // };

  // const handleSliderChange = (newPosition) => {
  //   if (isPlaying) {
  //     pauseTimeline();
  //   }
  //   console.log('slider moved');
  //   const totalNumDays = dateDiff(new Date(startDate), new Date(endDate));
  //   const newDaysPassed = Math.trunc((newPosition / 696) * totalNumDays);
  //   const newCurrentDate = calculateNewDate(new Date(startDate), newDaysPassed);
  //   console.log('newDaysPassed ', newDaysPassed);
  //   console.log('newCurrentDate ', newCurrentDate);
  //   setGlobeMarkers(newCurrentDate);
  //   setCurrent({ date: newCurrentDate, daysPassed: newDaysPassed });
  // };

  const classes = useStyles();

  // when playing, move slider position in increments
  // let sliderPosition = null;
  // if (isPlaying) {
  //   sliderPosition =
  //     (current.daysPassed / dateDiff(new Date(startDate), new Date(endDate))) *
  //     687;
  // }

  return (
    <>
      {isInTimelineView ? (
        <div className={classes.timeline}>
          {isPlaying ? (
            <Button className={classes.playButton}>
              <div className={classes.pauseIcon}></div>
            </Button>
          ) : (
            <Button
              className={classes.playButton}
              // onClick={() => {
              //   if (isSliderEnabled) {
              //     startPlay();
              //   }
              // }}
            >
              <div className={classes.playIcon}></div>
            </Button>
          )}
          <Slider />
          <div className={classes.currentDate}>2021-04-21</div>
          <div className={classes.downloadIcon}></div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default React.memo(Timeline);
