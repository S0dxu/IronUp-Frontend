import React, { useState, useEffect } from 'react';
import './Timer.css';
import play_icon from './../../assets/play-1003-svgrepo-com.png';
import redo_icon from './../../assets/redo-svgrepo-com.png';
import bell_icon from './../../assets/3119338.png';
import mute_bell_icon from './../../assets/9032475.png';
import pause_icon from './../../assets/pause-1006-svgrepo-com.svg';
import cron_icon from './../../assets/timer-svgrepo-com.svg';
import timer_icon from './../../assets/hourglass-simple-fill-svgrepo-com.svg';

const Timer = () => {
  const totalTime = 10;
  const [timer, setTimer] = useState(totalTime);
  const [chronometer, setChronometer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('timer');
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      if (mode === 'timer') {
        setTimer((prev) => Math.max(prev - 1, 0));
      } else if (mode === 'cron') {
        setChronometer((prev) => prev + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, mode]);

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimer(totalTime);
    setChronometer(0);
  };

  const toggleSound = () => {
    setIsSoundEnabled((prev) => !prev);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const fraction = mode === 'timer' ? timer / totalTime : chronometer / totalTime;
  const offset = circumference * (1 - fraction);

  return (
    <div className="timer">
      <div className="switch">
        <img
          src={cron_icon}
          onClick={() => setMode('cron')}
          className={mode === 'cron' ? 'active2' : ''}
        />
        <img
          src={timer_icon}
          onClick={() => setMode('timer')}
          className={mode === 'timer' ? 'active2' : ''}
        />
      </div>

      {mode === 'timer' ? (
        <div className="circle">
          <svg width="120" height="120">
            <g transform="rotate(-90 60 60)">
              <circle
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke="#000"
                strokeWidth="1.5"
                strokeDasharray="2,6"
                strokeLinecap="round"
              />
              <circle
                className="time-arc"
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke="#000"
                strokeWidth="1.5"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{ transition: isRunning ? 'stroke-dashoffset 1s linear' : 'none' }}
              />
            </g>
          </svg>
          <div className="time-text">{formatTime(timer)}</div>
        </div>
      ) : (
        <div className="circle">
          <svg width="120" height="120">
            <g transform="rotate(-90 60 60)">
              <circle
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke="#000"
                strokeWidth="1.5"
                strokeDasharray="2,6"
                strokeLinecap="round"
              />
              <circle
                className="time-arc"
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke="#000"
                strokeWidth="1.5"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{ transition: isRunning ? 'stroke-dashoffset 1s linear' : 'none' }}
              />
            </g>
          </svg>
          <div className="time-text">{formatTime(chronometer)}</div>
        </div>
      )}

      <div className="player">
        <img src={redo_icon} onClick={resetTimer} />
        {
          !isRunning ? (
            <img src={play_icon} className={'play'} onClick={toggleTimer} />
          ) : (
            <img src={pause_icon} className={'play'} onClick={toggleTimer} />
          )
        }
         <img
          src={isSoundEnabled ? bell_icon : mute_bell_icon}
          onClick={toggleSound}
        />
      </div>
    </div>
  );
};

export default Timer;
