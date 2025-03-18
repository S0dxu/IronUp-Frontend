import React, { useState, useEffect, useRef } from 'react';
import './Timer.css';
import play_icon from './../../assets/play-1003-svgrepo-com.png';
import redo_icon from './../../assets/redo-svgrepo-com.png';
import bell_icon from './../../assets/3119338.png';
import mute_bell_icon from './../../assets/9032475.png';
import pause_icon from './../../assets/pause-1006-svgrepo-com.svg';
import cron_icon from './../../assets/timer-svgrepo-com.svg';
import timer_icon from './../../assets/hourglass-simple-fill-svgrepo-com.svg';
import hour_icon from './../../assets/hour.png';
import close_icon from './../../assets/75519.png';

const Timer: React.FC = () => {
  const [timer, setTimer] = useState<number>(10);
  const [chronometer, setChronometer] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [mode, setMode] = useState<'timer' | 'cron'>('timer');
  const [detailAnimation, setDetailAnimation] = useState<string>('');
  const [isDetailVisible, setIsDetailVisible] = useState<boolean>(false);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(10);
  const detailRef = useRef<HTMLDivElement>(null);
  const [initialTime, setInitialTime] = useState<number>(10);
  
  useEffect(() => {
    let wakeLock: any = null;
    async function requestWakeLock() {
      if ('wakeLock' in navigator) {
        try {
          wakeLock = await (navigator as any).wakeLock.request('screen');
        } catch (err) {}
      }
    }
    requestWakeLock();
    return () => {
      if (wakeLock) {
        wakeLock.release();
        wakeLock = null;
      }
    }
  }, []);

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
    setTimer(initialTime);
    setChronometer(0);
  };

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  const fraction = timer / totalSeconds;
  const offset = circumference * (1 - fraction);

  const closeTaskDetail = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (detailAnimation !== 'exit') {
      setDetailAnimation('exit');
    }
  };

  const handleAnimationEnd = () => {
    if (detailAnimation === 'exit') {
      setIsDetailVisible(false);
      setDetailAnimation('');
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (detailRef.current && !detailRef.current.contains(e.target as Node)) {
        if (detailAnimation !== 'exit') {
          setDetailAnimation('exit');
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [detailAnimation]);

  const openTaskDetail = () => {
    setIsDetailVisible(true);
    setDetailAnimation('enter');
  };

  const saveTimer = () => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    setTimer(totalSeconds);
    setInitialTime(totalSeconds);
    closeTaskDetail();
  };

  return (
    <div className="timer">
      <div className="switch">
        <img
          src={cron_icon}
          onClick={() => setMode('cron')}
          className={mode === 'cron' ? 'active2' : ''}
          alt="Cron"
        />
        <img
          src={timer_icon}
          onClick={() => setMode('timer')}
          className={mode === 'timer' ? 'active2' : ''}
          alt="Timer"
        />
      </div>

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
        <div className="time-text">{formatTime(mode === 'timer' ? timer : chronometer)}</div>
      </div>

      <div className="player">
        <img src={redo_icon} onClick={resetTimer} alt="Reset" />
        <img
          src={isRunning ? pause_icon : play_icon}
          className="play"
          onClick={toggleTimer}
          alt={isRunning ? 'Pause' : 'Play'}
        />
        <img
          src={hour_icon}
          alt="Hourglass"
          onClick={openTaskDetail}
        />
      </div>

      {isDetailVisible && (
        <div
          className={`task-detail timer-det ${detailAnimation}`}
          ref={detailRef}
          onAnimationEnd={handleAnimationEnd}
        >
          <button className="close-btn" onClick={closeTaskDetail}>
            <img src={close_icon} alt="close" />
          </button>
          <h4>Set Timer</h4>
          <ul>
            <p>H</p>
            <p>/</p>
            <p>M</p>
            <p>/</p>
            <p>S</p>
          </ul>
          <div className="time-inputs">
            <input
              type="number"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              placeholder="Hours"
              max="24"
            />
            <p>/</p>
            <input
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(Math.min(60, Number(e.target.value)))}
              placeholder="Minutes"
              max="60"
            />
            <p>/</p>
            <input
              type="number"
              value={seconds}
              onChange={(e) => setSeconds(Math.min(60, Number(e.target.value)))}
              placeholder="Seconds"
              max="60"
            />
          </div>

          <button className="doit" onClick={saveTimer}>
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default Timer;
