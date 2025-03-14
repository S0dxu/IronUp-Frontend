import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Settings.css';
import dx_arr from './../../assets/arrow-next-svgrepo-com.svg';

const Settings: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState('');
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    const logout = (err?: Error) => {
        localStorage.removeItem('token');
        navigate("/login")
        console.error('Error logging out:', err);
    }

    const getUser = async () => {
        try {
          setLoading(true);
          const response = await fetch(`Coinahttps://iron-back.onrender.com/user/${token}`);
          const data = await response.json();
      
          if (response.ok) {
            setUsername(data.username);
            setAvatar(data.avatar);
          }
        } catch (error) {
          console.error("Errore nel recupero del gruppo:", error);
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        getUser();
      }, []);
    
      if (loading) {
        return <div className="settings"></div>;
      } 

    return (
        <div className='settings'>
            <ul>
                <h4>Profile</h4>
                <li>
                    <p>Change Name <span>{username}</span><img src={dx_arr} /></p>
                    <p>Change Picture <span><img className='fp' src={avatar}></img></span><img src={dx_arr} /></p>
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