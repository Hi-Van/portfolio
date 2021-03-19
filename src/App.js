/* eslint-disable no-unused-vars */
import './App.css';
import resume from './Vanouphon_Sirisouk_Resume.pdf';
import logo from './perspective.svg';
import Tilt from 'react-parallax-tilt';
import { Switch, Route, Link } from 'react-router-dom';
import { Link as Scroll } from 'react-scroll';
import { FaGithub, FaTwitter, FaLinkedin, FaFileInvoice, FaAngleUp } from "react-icons/fa";
import Projects from './project.js';
import Exp from './exp.js';
import About from './about.js';

function App() {
  return (
    <div className="App">
      <div className='content'>
        <div className='homepage'>
          <Tilt>
            <img className='logo' src={logo} alt='logo' />
          </Tilt>
          <div>
            <div className='grid-btn'>
              <Scroll to='about' smooth={true} duration={600}><button className='btn-link'>About Me</button></Scroll>
              <Scroll to='experience' smooth={true} duration={600}><button className='btn-link'>Experience</button></Scroll>
              <Scroll to='projects' smooth={true} duration={900}><button className='btn-link'>Projects</button></Scroll>
            </div>
            <div className='btn-container'>
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

        <div style={{display:'flex', justifyContent:'center'}}>
        <Scroll to='projects' smooth={true} duration={600}><button className='btn-link'> Back To Top &nbsp;&nbsp; <FaAngleUp/> </button></Scroll>
        </div>
      </div>
    </div>
  );
}

export default App;
