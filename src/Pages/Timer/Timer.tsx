import React, { useState, useEffect } from 'react';
import './Timer.css';
import play_icon from './../../assets/play-1003-svgrepo-com.png';
import redo_icon from './../../assets/redo-svgrepo-com.png';
import bell_icon from './../../assets/3119338.png';
import mute_bell_icon from './../../assets/9032475.png';
import pause_icon from './../../assets/pause-1006-svgrepo-com.svg';
import cron_icon from './../../assets/timer-svgrepo-com.svg';
import timer_icon from './../../assets/hourglass-simple-fill-svgrepo-com.svg';

const Timer: React.FC = () => {
  const totalTime = 10;
  const [timer, setTimer] = useState<number>(totalTime);
  const [chronometer, setChronometer] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [mode, setMode] = useState<'timer' | 'cron'>('timer');
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(true);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimer((prev) => (mode === 'timer' ? Math.max(prev - 1, 0) : prev));
      setChronometer((prev) => (mode === 'cron' ? prev + 1 : prev));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, mode]);

  const toggleTimer = (): void => {
    setIsRunning((prev) => !prev);
  };

  const resetTimer = (): void => {
    setIsRunning(false);
    setTimer(totalTime);
    setChronometer(0);
  };

  const toggleSound = (): void => {
    setIsSoundEnabled((prev) => !prev);
  };

  const formatTime = (time: number): string => {
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
        <img src={cron_icon} onClick={() => setMode('cron')} className={mode === 'cron' ? 'active2' : ''} alt="Cron" />
        <img src={timer_icon} onClick={() => setMode('timer')} className={mode === 'timer' ? 'active2' : ''} alt="Timer" />
      </div>

      <div className="circle">
        <svg width="120" height="120">
          <g transform="rotate(-90 60 60)">
            <circle cx="60" cy="60" r={radius} fill="none" stroke="#000" strokeWidth="1.5" strokeDasharray="2,6" strokeLinecap="round" />
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
        <div className="time-text">{formatTime(mode === 'timer' ? timer : chronometer)}</div>
      </div>

      <div className="player">
        <img src={redo_icon} onClick={resetTimer} alt="Reset" />
        <img src={isRunning ? pause_icon : play_icon} className="play" onClick={toggleTimer} alt="Play/Pause" />
        <img src={isSoundEnabled ? bell_icon : mute_bell_icon} onClick={toggleSound} alt="Sound Toggle" />
      </div>
    </div>
  );
};

export default Timer;
