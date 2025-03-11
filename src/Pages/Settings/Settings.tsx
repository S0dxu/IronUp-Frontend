import React, { useState, useEffect } from 'react';
import './Settings.css';
import dx_arr from './../../assets/arrow-next-svgrepo-com.svg';

const Settings: React.FC = () => {
  return (
    <div className='settings'>
        <ul>
            <h4>Profile</h4>
            <li>
                <p>Change Name <span>Giorgio</span><img src={dx_arr} /></p>
                <p>Change Picture <span><img className='fp' src="https://st3.depositphotos.com/13194036/32532/i/450/depositphotos_325320602-stock-photo-sexy-muscular-bodybuilder-bare-torso.jpg"></img></span><img src={dx_arr} /></p>
                <p>Change Password <img src={dx_arr} /></p>
                <p>Delete Account <img src={dx_arr} /></p>
            </li>
        </ul>
        <ul>
            <h4>Help & Settings</h4>
            <li>
                <p>Help Center <img src={dx_arr} /></p>
                <p>Language <span>English</span><img src={dx_arr} /></p>
                <p>Delete <img src={dx_arr} /></p>
            </li>
        </ul>
    </div>
  );
};

export default Settings;