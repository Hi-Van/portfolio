import React from 'react';
import hand from '../resources/Rock_On_R-Angle_A4_0000.png';
import '../stylesheets/home.css';
import { FcIdea, FcManager, FcOpenedFolder } from 'react-icons/fc';
import { Link } from 'react-scroll';

const Home = () => {
    return (
        <div className='App'>

            <div className='land'>
                <div>
                    <h1 className='land-title'><span style={{ color: '#685dbb' }}>Van</span>ouphon <br /><span style={{ color: '#685dbb' }}>S</span>irisouk<span style={{ color: '#685dbb' }}>.</span></h1>
                    <h2 className='land-subtitle'>Woah! Hey there stranger<span className='wave'>👋</span></h2>
                    <Link className='land-link' to='About' smooth={true} duration={500}><FcIdea /> About Me</Link>
                    <br/>
                    <Link className='land-link' to='About' smooth={true} duration={500}><FcManager /> Experience</Link>
                    <br/>
                    <Link className='land-link' to='About' smooth={true} duration={500}><FcOpenedFolder /> Projects</Link>
                </div>
                <img src={hand} alt='hand' className='hand floating' />
            </div>
        </div>
    );
};

export default Home;