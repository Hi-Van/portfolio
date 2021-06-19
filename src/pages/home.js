import React from 'react';
import hand from '../resources/Rock_On_R-Angle_A4_0000.png';
import '../stylesheets/home.css';

const Home = () => {
    return (
        <div className='App'>

            <div className='land'>
                <div>
                    <h1 className='land-title'><span style={{ color: '#685dbb' }}>Van</span>ouphon <span style={{ color: '#685dbb' }}>S</span>irisouk<span style={{ color: '#685dbb' }}>.</span></h1>
                    <h2 className='land-subtitle'>Woah! Hey there stranger👋</h2>
                </div>
                <img src={hand} alt='hand' className='hand floating' />
            </div>
        </div>
    );
};

export default Home;