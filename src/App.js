import logo from './media/landing-logo.svg';
import selfie from './media/Selfie.png';
import who from './media/WhoAre.png';
import exp from './media/WhatExp.png';
import arrow from './media/arrows.png';
import { BsFillArrowDownRightCircleFill, BsTwitter, BsGithub } from 'react-icons/bs';
import { FaLinkedinIn } from 'react-icons/fa';
import './App.css';

function App() {
  return (
    <div className="App">

      <div className='content'>

        <div className='page home'>

          <img className='logo' src={logo} alt="logo" />

          <div className='flex specialLeft'>
            <a className="btn yellow pill" href="#target">Learn More &nbsp; <BsFillArrowDownRightCircleFill /></a>

            <div className='flex'>
              <a className="btn social rounded" href="https://www.linkedin.com/in/van-s/" target="_blank" rel="noreferrer"><FaLinkedinIn /></a>
              <a className="btn social rounded" href="https://twitter.com/Hi_Im_Van" target="_blank" rel="noreferrer"><BsTwitter /></a>
              <a className="btn social rounded" href="https://github.com/Hi-Van" target="_blank" rel="noreferrer"><BsGithub /></a>
            </div>

          </div>

        </div>

        <div className='page'>

          <div className='flex spacer' id="target">

            <div>
              <img src={who} alt='who' />
              <p>
                Hi, I'm Van. I'm currently a Junior at University of Connecticut. I'll be joining Meta (Prev. Facebook) as a Software Engineer Intern in this coming summer. I also like to do a couple things, namely, founding a group of collaborative students, known as UConn Stamford Engineer Majors, involving myself with others as a Developer in Summer of Shipping, and working as an Intern at Edgewell Personal Care. When I'm not busy you can find me networking on LinkedIn, scrolling down Twitter, or reading documents on GitHub.
              </p>
              <div className='flex specialLeft'>
                <a className="btn social rounded" href="https://www.linkedin.com/in/van-s/" target="_blank" rel="noreferrer"><FaLinkedinIn /></a>
                <a className="btn social rounded" href="https://twitter.com/Hi_Im_Van" target="_blank" rel="noreferrer"><BsTwitter /></a>
                <a className="btn social rounded" href="https://github.com/Hi-Van" target="_blank" rel="noreferrer"><BsGithub /></a>
              </div>
            </div>

            <img className='selfie' src={selfie} alt="selfie" />

          </div>

        </div>

        <div className='page'>
          <img src={exp} alt='exp-title' />

          <img className='arrow' src={arrow} alt='arrow'></img>

          <img className='arrow flip' src={arrow} alt='arrow'></img>

          <img className='arrow' src={arrow} alt='arrow'></img>
        </div>




      </div>
    </div>
  );
}

export default App;
