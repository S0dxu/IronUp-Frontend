import React, { useState, useEffect } from 'react';
import './Home.css';
import plus from './../../assets/plus-large-svgrepo-com.svg';
import dx_arr from './../../assets/arrow-next-svgrepo-com.svg';
import sx_arr from './../../assets/arrow-prev-svgrepo-com.svg';
import tick_icon from './../../assets/tick.png';
import cross_icon from './../../assets/cross.png';

const Home = () => {
  const [calendarDays, setCalendarDays] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [today, setToday] = useState(new Date().getDate());

  const highlighted_days = ["1/3/2025", "2/3/2025", "3/3/2025", "4/3/2025", "5/3/2025", "6/3/2025", "7/3/2025", "8/3/2025", "10/2/2025"];

  useEffect(() => {
    const generateCalendar = () => {
      const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
      const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

      const daysInMonth = lastDayOfMonth.getDate();
      
      const daysArray = [];
      for (let i = 1; i <= daysInMonth; i++) {
        daysArray.push(i);
      }

      setCalendarDays(daysArray);
    };

    generateCalendar();
  }, [currentMonth, currentYear]);

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isHighlighted = (day) => {
    const date = `${day}/${currentMonth + 1}/${currentYear}`;
    return highlighted_days.includes(date);
  };

  return (
    <div className='home'>
      <h2>Giorgio</h2>
      <img src="https://st3.depositphotos.com/13194036/32532/i/450/depositphotos_325320602-stock-photo-sexy-muscular-bodybuilder-bare-torso.jpg" className='profile-pic' />
      <div className="stats">
        <p><span>💪</span> <span>351</span> <span>Done</span></p>
        <p><span>🕗</span> <span>26/90</span> <span>Days</span></p>
        <p><span>🔥</span> <span>26</span> <span>Streak</span></p>
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
              className={`calendar-day ${
                day === today && currentMonth === new Date().getMonth() ? 'today' : ''} 
                ${isHighlighted(day) ? 'highlighted' : ''}`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
      <div className="challe">
        <h3>Challenges</h3>
        <ul>
            <li>
                <div>
                    <img src={tick_icon} />
                    {/* <h4>💪</h4>
                    <h4>👑</h4> */}
                </div>
                <div>
                    <h4>Completed - 30/30 Days </h4>
                    {/* <h5>150 pushups</h5>
                    <h5>3658 points</h5> */}
                </div>
            </li>
            <li>
                <img src={cross_icon} />
                <div>
                    <h4>Failed - 19/30 Days</h4>
                </div>
            </li>
            <li>
                <div>
                    <img src={tick_icon} />
                </div>
                <div>
                    <h4>Completed - 60/60 Days </h4>
                </div>
            </li>
            <li>
                <div>
                    <img src={tick_icon} />
                </div>
                <div>
                    <h4>Completed - 15/15 Days </h4>
                </div>
            </li>
            <li>
                <img src={cross_icon} />
                <div>
                    <h4>Failed - 9/60 Days</h4>
                </div>
            </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
