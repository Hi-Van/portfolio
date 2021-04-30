/* eslint-disable no-unused-vars */
import './App.css';
import resume from './Vanouphon_Sirisouk_Resume.pdf';
import avatar from './avataaars (1).png';
import Tilt from 'react-parallax-tilt';
import { Switch, Route, Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import { Link as Scroll } from 'react-scroll';
import { FaGithub, FaTwitter, FaLinkedin, FaFileInvoice } from "react-icons/fa";
import Projects from './project.js';
import Exp from './exp.js';
import About from './about.js';

function App() {
  return (
    <div className="App">
      <div className='content'>
        <div className='homepage'>
          <div>
            <img className='avatar'src={avatar} alt='avatar'/>
            <h1 style={{ fontWeight: 600}}>VANOUPHON SIRISOUK</h1>
            <div className='type-wrapper'>
              <h1 style={{fontWeight: 400, letterSpacing: '0.03rem', color: '#535e63'}}>Full-</h1>
              <h1 style={{fontWeight: 400, letterSpacing: '0.03rem', color: '#535e63'}}><Typewriter options={{
                strings: ['‏‏‎Time Student', 'Blown Java Boi'],
                autoStart: true,
                pauseFor: 2200,
                delay: 120,
                loop: true,
              }} /></h1>
            </div>
            <div style={{padding: '0em 2em 0em 2em'}}className='grid-btn'>
              <Scroll style={{ cursor: 'context-menu' }} to='about' smooth={true} duration={600}><button className='btn-link'>About Me</button></Scroll>
              <Scroll style={{ cursor: 'context-menu' }} to='experience' smooth={true} duration={600}><button className='btn-link'>Experience</button></Scroll>
              <Scroll style={{ cursor: 'context-menu' }} to='projects' smooth={true} duration={900}><button className='btn-link'>Projects</button></Scroll>
            </div>
            <div style={{padding: '0em 0.75em 0em 0.75em'}}className='btn-container'>
              <a href='https://github.com/Hi-Van' target='_blank' rel='noopener noreferrer'><button className='github-btn'><FaGithub /></button></a>
              <a href='https://twitter.com/Hi_Im_Van' target='_blank' rel='noopener noreferrer'><button className='twitter-btn'><FaTwitter /></button></a>
              <a href='https://www.linkedin.com/in/van-s/' target='_blank' rel='noopener noreferrer'><button className='linkedin-btn'><FaLinkedin /></button></a>
              <a href={resume} download><button className='resume-btn' title='download resume'><FaFileInvoice /></button></a>
            </div>
          </div>
        </div>
        <About />
        <Exp />
        <Projects />
      </div>
    </div>
  );
}

export default App;
