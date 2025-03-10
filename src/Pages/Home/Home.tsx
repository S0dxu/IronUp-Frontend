import React, { useState, useEffect } from 'react';
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

const Home: React.FC = () => {
  const [calendarDays, setCalendarDays] = useState<number[]>([]);
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [today] = useState<number>(new Date().getDate());

  const highlighted_days: string[] = [
    "1/3/2025", "2/3/2025", "3/3/2025", "4/3/2025", "5/3/2025", "6/3/2025", "7/3/2025", "8/3/2025", "10/2/2025"
  ];

  useEffect(() => {
    const generateCalendar = () => {
      const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      setCalendarDays(Array.from({ length: lastDayOfMonth }, (_, i) => i + 1));
    };
    generateCalendar();
  }, [currentMonth, currentYear]);

  const handlePreviousMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    if (currentMonth === 0) setCurrentYear((prevYear) => prevYear - 1);
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    if (currentMonth === 11) setCurrentYear((prevYear) => prevYear + 1);
  };

  const isHighlighted = (day: number): boolean => {
    return highlighted_days.includes(`${day}/${currentMonth + 1}/${currentYear}`);
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

        <div className="tasks">
            <h3>Tasks</h3>
            <ul>
                <li className='dail'>
                    <img src={fire_icon} />
                    <h4>Do 26 Pushups - 500 <img src={coin_icon} /></h4>
                    <img className='arr' src={dx_arr} />
                </li>
                <li>
                    <img src={fire_icon} />
                    <h4>Do 20 Dips - 250 <img src={coin_icon} /></h4>
                    <img className='arr' src={dx_arr} />
                </li>
                <li>
                    <img src={fire_icon} />
                    <h4>Do 5 Explosive Pushups - 200 <img src={coin_icon} /></h4>
                    <img className='arr' src={dx_arr} />
                </li>
                <li>
                    <img src={fire_icon} />
                    <h4>Do 20 Dips - 100 <img src={coin_icon} /></h4>
                    <img className='arr' src={dx_arr} />
                </li>
            </ul>
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
                    <img src={fire_icon} />
                    <div>
                        <h4>Pending - 26/90 Days</h4>
                    </div>
                </li>
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