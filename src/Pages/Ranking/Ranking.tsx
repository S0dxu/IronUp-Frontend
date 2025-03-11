import React, { useState, useEffect } from 'react';
import './Ranking.css';
import dots from './../../assets/427221-200.png'
import coin_icon from './../../assets/JD-09-512.png';
import crown_icon from './../../assets/crown.png';
import crown2_icon from './../../assets/2385856.png';

const Ranking: React.FC = () => {
  return (
    <div className='ranking'>
        <div>
            <h3>Push Ups</h3>
            <img src={dots} className="dots" />
        </div>
        <div className='lead'>
            <li>
                <div>
                    <img src="https://t4.ftcdn.net/jpg/02/24/86/95/360_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg" />
                    <h1>2</h1>
                    <p>Marco</p>
                </div>
            </li>
            <li>
                <div>
                    <img src={crown2_icon} className='crown2' />
                    <img src="https://st3.depositphotos.com/13194036/32532/i/450/depositphotos_325320602-stock-photo-sexy-muscular-bodybuilder-bare-torso.jpg" />
                    <h1>1</h1>
                    <p>Giorgio</p>
                </div>
            </li>
            <li>
                <div>
                    <img src="https://img.freepik.com/foto-gratuito/giovane-uomo-barbuto-con-camicia-a-righe_273609-5677.jpg" />
                    <h1>2</h1>
                    <p>Luca</p>
                </div>
            </li>
        </div>
        <ul>
            <li>
                <div>
                    <h1>1</h1>
                    {/* <img src={crown_icon} className='crown' /> */}
                    <img src="https://st3.depositphotos.com/13194036/32532/i/450/depositphotos_325320602-stock-photo-sexy-muscular-bodybuilder-bare-torso.jpg" />
                    <p>Giorgio</p>
                </div>
                <span>950 <img src={coin_icon} /></span>
            </li>
            <li>
                <div>
                    <h1>2</h1>
                    <img src="https://t4.ftcdn.net/jpg/02/24/86/95/360_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg" />
                    <p>Marco</p>
                </div>
                <span>900 <img src={coin_icon} /></span>
            </li>
            <li>
                <div>
                    <h1>3</h1>
                    <img src="https://img.freepik.com/foto-gratuito/giovane-uomo-barbuto-con-camicia-a-righe_273609-5677.jpg" />
                    <p>Luca</p>
                </div>
                <span>800 <img src={coin_icon} /></span>
            </li>
            <li>
                <div>
                    <h1>4</h1>
                    <img src="https://img.freepik.com/premium-photo/handsome-man-isolated-wall-pointing-side-present-product_1368-93857.jpg?semt=ais_hybrid" />
                    <p>Davide</p>
                </div>
                <span>350 <img src={coin_icon} /></span>
            </li>
            <li>
                <div>
                    <h1>5</h1>
                    <img src="https://plus.unsplash.com/premium_photo-1682096259050-361e2989706d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8eW91bmclMjBtYW58ZW58MHx8MHx8fDA%3D" />
                    <p>Matteo</p>
                </div>
                <span>150 <img src={coin_icon} /></span>
            </li>
            <li>
                <div>
                    <h1>6</h1>
                    <img src="https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm0zMjgtMzY2LXRvbmctMDhfMS5qcGc.jpg" />
                    <p>Leonardo</p>
                </div>
                <span>50 <img src={coin_icon} /></span>
            </li>
        </ul>
    </div>
  );
};

export default Ranking;
