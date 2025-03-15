import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import plus from './../../assets/plus-large-svgrepo-com.svg';
import dx_arr from './../../assets/arrow-next-svgrepo-com.svg';
import sx_arr from './../../assets/arrow-prev-svgrepo-com.svg';
import tick_icon from './../../assets/tick.png';
import cross_icon from './../../assets/cross.png';
import pending_icon from './../../assets/question-svgrepo-com.svg';
import daily_icon from './../../assets/calendar.png';
import fire_icon from './../../assets/fire.png';
import coin_icon from './../../assets/JD-09-512.png';
import close_icon from './../../assets/75519.png';

const Home: React.FC = () => {
  const [calendarDays, setCalendarDays] = useState<number[]>([]);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);
  const [loadingGroup, setLoadingGroup] = useState<boolean>(true);
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [today] = useState<number>(new Date().getDate());
  const [taskDone, setTaskDone] = useState<boolean>(false);
  const [increment, setIncrement] = useState<number>(1);
  const [startingPoint, setStartingPoint] = useState<number>(1);
  const [username, setUsername] = useState<string>("");
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [coin, setCoin] = useState<number>(0);
  const [avatar, setAvatar] = useState<string>("");
  const token: string | null = localStorage.getItem('token');
  const [groupExercise, setGroupExercise] = useState<string>('');
  const [daysLeft, setDaysLeft] = useState<number>();
  let [totalDays, setTotalDays] = useState<number>();
  const [history, setHistory] = useState<string[]>([]);
  const daysDifference = (totalDays || 0) - (daysLeft || 0);
  const [openTaskIndex, setOpenTaskIndex] = useState<number | null>(null);
  const [detailAnimation, setDetailAnimation] = useState<string>('');
  const detailRef = useRef<HTMLDivElement>(null);
  const [toAnimation, setToAnimation] = useState<boolean>(false);

  useEffect(() => {
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    setCalendarDays(Array.from({ length: lastDayOfMonth }, (_, i) => i + 1));
  }, [currentMonth, currentYear]);

  useEffect(() => {
    if (openTaskIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [openTaskIndex]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (detailRef.current && !detailRef.current.contains(e.target as Node)) {
        if (openTaskIndex !== null && detailAnimation !== 'exit') {
          setDetailAnimation('exit');
        }
      }
    };
    if (openTaskIndex !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openTaskIndex, detailAnimation]);

  const handlePreviousMonth = () => {
    if (openTaskIndex !== null) return;
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    if (currentMonth === 0) setCurrentYear((prevYear) => prevYear - 1);
  };

  const handleNextMonth = () => {
    if (openTaskIndex !== null) return;
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    if (currentMonth === 11) setCurrentYear((prevYear) => prevYear + 1);
  };

  const isHighlighted = (day: number): boolean => {
    return history.includes(`${day}/${currentMonth + 1}/${currentYear}`);
  };

  useEffect(() => {
    if (history.includes(`${today}/${currentMonth + 1}/${currentYear}`)){
      setTaskDone(true);
    }
  }, [history, today, currentMonth, currentYear]);

  const todaysTheDay = `${today}/${currentMonth + 1}/${currentYear}`;

  const cash = async () => {
    try {
      const response = await fetch('https://iron-back.onrender.com/cash', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, date: todaysTheDay }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to cash');
      }
      setCoin(data.coin);
    } catch (error) {
      console.error('Error fetching cash:', error);
      alert('Error fetching cash');
    }
  };

  const claimReward = () => {
    cash();
    closeTaskDetail();
    setTimeout(() => {
      setToAnimation(true);
      setTimeout(() => {
        setToAnimation(false);
      }, 300);
    }, 300)
    setTimeout(() => {
      setTaskDone(true);
    }, 600);
  };

  const tasksData = [
    {
      title: `${(daysDifference * increment) - increment + startingPoint} ${groupExercise}`,
      reward: 500,
      detail: `Perform ${(daysDifference * increment) - increment + startingPoint} ${groupExercise} in one set without ever lifting your feet off the ground; you can take your hands off the ground.`
    }
  ];

  const handleTaskClick = (index: number) => {
    if (openTaskIndex !== null) return;
    setOpenTaskIndex(index);
    setDetailAnimation('enter');
  };

  const closeTaskDetail = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (detailAnimation !== 'exit') {
      setDetailAnimation('exit');
    }
  };

  const handleAnimationEnd = () => {
    if (detailAnimation === 'exit') {
      setOpenTaskIndex(null);
      setDetailAnimation('');
    }
  };

  const getUser = async () => {
    try {
      setLoadingUser(true);
      const response = await fetch(`https://iron-back.onrender.com/user/${token}`);
      const data = await response.json();
      if (response.ok) {
        setUsername(data.username);
        setAvatar(data.avatar);
        setCoin(data.coin);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setTimeout(() => {
        setLoadingUser(false);
      }, 600);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    setIsCompleted(daysDifference === totalDays);
  }, [daysDifference, totalDays]);
  
  const getUserData = async () => {
    try {
      setLoadingGroup(true);
      const userResponse = await fetch(`https://iron-back.onrender.com/user/${token}`);
      const userData = await userResponse.json();
      const groupResponse = await fetch(`https://iron-back.onrender.com/user-group/${userData.username}`);
      const groupData = await groupResponse.json();
      if (userResponse.ok && groupResponse.ok) {
        setGroupExercise(groupData.exercise);
        setIncrement(groupData.increment);
        setStartingPoint(groupData.startingPoint);
        setDaysLeft(groupData.daysLeft);
        setTotalDays(groupData.totals);
        setHistory(groupData.history || []);
      }
    } catch (error) {
      console.error("Error fetching group data:", error);
    } finally {
      setTimeout(() => {
        setLoadingGroup(false);
      }, 1600);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const loading = loadingUser || loadingGroup;
  if (loading) {
    return <div className="home"></div>;
  }

  const startDaysLeft = (totalDays || 0) - (daysLeft || 0);

  const formatPoints = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return num.toString();
  };

  return (
    <div className='home'>
      <h2>{username}</h2>
      <img src={avatar} className='profile-pic' alt="Profile" />
      <div className="stats">
        {!isCompleted && (
        <>
          <p>
            <span>
              <img src={taskDone ? tick_icon : cross_icon} className='idunno' alt="status" />
            </span>
            <span>{taskDone ? (daysDifference + (startingPoint || 0) - 1) : 0}</span>
            <span>Today</span>
          </p>
        </>
        )}
        <p>
          <span>🕗</span>
          <span>{daysDifference || 0}/{totalDays || 0}</span>
          <span>Days</span>
        </p>
        <p>
          <span>
            <img src={coin_icon} alt="coin" />
          </span>
          <span>{formatPoints(coin)}</span>
          <span>Points</span>
        </p>
      </div>
      <div className="tasks">
        {!taskDone && !isCompleted && groupExercise && <h3>Tasks</h3>}
        {groupExercise && (
          <ul>
            {tasksData.map((task, index) => (
              <li key={index} onClick={() => handleTaskClick(index)}>
                {!taskDone && !isCompleted && (
                  <div className="task-summary">
                    <img src={fire_icon} alt="task icon" />
                    <h4>
                      Do {task.title} - {task.reward} <img src={coin_icon} alt="coin" />
                    </h4>
                    <img className='arr' src={dx_arr} alt="arrow" />
                  </div>
                )}
                {taskDone && (
                  <div className={`task-summary ${taskDone && ("goaway-now")} ${toAnimation && ("goaway-animation")}`}>
                    <img src={fire_icon} alt="task icon" />
                    <h4>
                      Completed: {task.title} - {task.reward} <img src={coin_icon} alt="coin" />
                    </h4>
                  </div>
                )}
                {openTaskIndex === index && (
                  <div className={`task-detail ${detailAnimation}`} ref={detailRef} onAnimationEnd={handleAnimationEnd}>
                    <button className="close-btn" onClick={closeTaskDetail}>
                      <img src={close_icon} alt="close" />
                    </button>
                    <img src={fire_icon} className="firebtn" alt="fire" />
                    <h4>{task.title}</h4>
                    <p>{task.detail}</p>
                    <button className="doit" onClick={claimReward}>
                      Claim your Reward of {task.reward} <img src={coin_icon} alt="coin" />
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="calend">
        <h3>Calendar</h3>
        <div className="calendar-navigation">
          <img src={sx_arr} onClick={handlePreviousMonth} alt="previous" />
          <span>{`${new Date(currentYear, currentMonth).toLocaleString('en-US', { month: 'long' })} ${currentYear}`}</span>
          <img src={dx_arr} onClick={handleNextMonth} alt="next" />
        </div>
        <div className="calendar-grid">
          {calendarDays.map((day) => (
            <div
              key={day}
              className={`calendar-day ${day === today && currentMonth === new Date().getMonth() ? 'today' : ''} ${isHighlighted(day) ? 'highlighted' : ''}`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
