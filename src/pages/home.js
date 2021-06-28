import React from 'react';
import hand from '../resources/Rock_On_R-Angle_A4_0000.png';
import '../stylesheets/home.css';
import Resume from '../resources/Censored resume.pdf';
import { Link } from 'react-scroll';
import {Fade} from 'react-reveal';

const Home = () => {
    return (
        <div className='App'>

            <div className='land'>
                <div>
                    <Fade left>
                        <h1 className='land-title'><span className='highlight'>Van</span>ouphon <br /><span className="highlight">S</span>irisouk<span className='highlight'>.</span></h1>
                        <h2 className='land-subtitle'>Woah! Hey there stranger<span className='wave'>👋</span></h2>
                        <div className='grid'>
                            <Link className='land-link' to='About' smooth={true} duration={500}>About Me</Link>
                            <Link className='land-link' to='Experience' smooth={true} duration={500}>Experience</Link>
                            <Link className='land-link' to='Projects' smooth={true} duration={500}>Projects</Link>
                            <a className='land-link' href={Resume} target='_blank' rel='noreferrer'>Resume</a>
                        </div>
                    </Fade>
                </div>
                
                    <img src={hand} alt='hand' className='hand floating' />
                
            </div>
        </div>
    );
};

export default Home;