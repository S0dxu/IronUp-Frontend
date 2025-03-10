import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import group_icon from './../../assets/group-people.png';
import notes_icon from './../../assets/notes-icon.png';
import timer_icon from './../../assets/ios-timer-4.png';
import home_icon from './../../assets/home.svg';
import './Navbar.css';

const Navbar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const getActive = (path: string): string => (location.pathname === path ? "active" : "");

    return (
        <div className='navbar'>
            <div onClick={() => navigate("/")}>
                <img className={getActive("/")} src={home_icon} alt="Home" />
                <span>Home</span>
            </div>
            <div onClick={() => navigate("/groups")}>
                <img className={getActive("/groups")} src={group_icon} />
                <span>Groups</span>
            </div>
            <div onClick={() => navigate("/ranking")}>
                <img className={getActive("/ranking")} src={notes_icon} />
                <span>{/* Ranking */}Leaderboard</span>
            </div>
            <div onClick={() => navigate("/timer")}>
                <img className={getActive("/timer")} src={timer_icon} />
                <span>Timer</span>
            </div>
        </div>
    );
};

export default Navbar;
