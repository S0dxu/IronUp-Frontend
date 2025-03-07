import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import group_icon from './../../assets/group-people.png';
import notes_icon from './../../assets/notes-icon.png';
import timer_icon from './../../assets/ios-timer-4.png';
import './Navbar.css';

const Navbar = () => {
    const [active, setActive] = useState("group");
    const navigate = useNavigate();

    const handleClick = (name, path) => {
        setActive(name);
        navigate(path);
    };

    return (
        <div className='navbar'>
            <div onClick={() => handleClick("group", "/")}>
                <img className={active === "group" ? "active" : ""} src={group_icon} alt="Group" />
                <span>Group</span>
            </div>
            <div onClick={() => handleClick("ranking", "/ranking")}>
                <img className={active === "ranking" ? "active" : ""} src={notes_icon} alt="Ranking" />
                <span>Ranking</span>
            </div>
            <div onClick={() => handleClick("timer", "/timer")}>
                <img className={active === "timer" ? "active" : ""} src={timer_icon} alt="Timer" />
                <span>Timer</span>
            </div>
        </div>
    );
};

export default Navbar;
