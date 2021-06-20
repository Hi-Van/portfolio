import React from 'react';
import Character from '../resources/richie.png';
import '../stylesheets/about.css';

const About = () => {
    return (
        <div className='About'>
            <h1>About div</h1>
            <h1>About div</h1>
            <img src={Character} alt='character' class='character'/>
        </div>
    );
};

export default About;