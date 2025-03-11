import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Settings.css';
import dx_arr from './../../assets/arrow-next-svgrepo-com.svg';

const Settings: React.FC = () => {
    const username: string | null = localStorage.getItem('username');
    const navigate = useNavigate();

    const logout = (err?: Error) => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        navigate("/login")
        console.error('Error logging out:', err);
    }

    return (
        <div className='settings'>
            <ul>
                <h4>Profile</h4>
                <li>
                    <p>Change Name <span>{username}</span><img src={dx_arr} /></p>
                    <p>Change Picture <span><img className='fp' src="https://st3.depositphotos.com/13194036/32532/i/450/depositphotos_325320602-stock-photo-sexy-muscular-bodybuilder-bare-torso.jpg"></img></span><img src={dx_arr} /></p>
                    <p>Change Password <img src={dx_arr} /></p>
                    <p onClick={() => logout()}>Log Out <img src={dx_arr} /></p>
                </li>
            </ul>
            <ul>
                <h4>Help & Settings</h4>
                <li>
                    <p>Help Center <img src={dx_arr} /></p>
                    <p>Language <span>English</span><img src={dx_arr} /></p>
                    <p>Delete Account <img src={dx_arr} /></p>
                </li>
            </ul>
        </div>
    );
};

export default Settings;