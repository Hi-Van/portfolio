import logo from './media/landing-logo.svg';
import selfie from './media/Selfie.png';
import who from './media/WhoAre.png';
import exp from './media/WhatExp.png';
import arrow from './media/arrows.png';
import { BsFillArrowDownRightCircleFill, BsTwitter, BsGithub } from 'react-icons/bs';
import { FaLinkedinIn } from 'react-icons/fa';
import D1 from './media/Aug Date.png';
import D2 from './media/Feb Date.png';
import D3 from './media/May Date.png';
import D4 from './media/May Date 2021.png';
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
          <img src={exp} alt='exp-title' style={{ marginBottom: '12rem' }} />

          <div className='job righthand'>
            <img src={D1} alt='aug date' />
            <h2>
              UConn Stamford Engineer Majors
            </h2>
            <h3>
              Founder
            </h3>
            <li>Scaled population from 14+ students to 40+ students</li>
            <li>Directed several teams of students, resulting in an overall reduction in stress & workload</li>
            <li>Lead a team of 13 collaborative students, decreasing time spent on assignments by 30% - 40% on avg.</li>

          </div>

          <img className='arrow' src={arrow} alt='arrow'></img>

          <div className='job'>
            <img src={D2} alt='aug date' />
            <h2>
              University of Connecticut
            </h2>
            <h3>
              CS & Mathematics Tutor
            </h3>
            <li>Assisted in analyzing and debugging code with students</li>
            <li>Communicated technical concepts and issues to students, clarifying confusion with students</li>
            <li>Created study plans based off of Computer Science & Calculus curriculum for students</li>

          </div>

          <img className='arrow flip' src={arrow} alt='arrow'></img>

          <div className='job righthand'>
            <img src={D3} alt='aug date' />
            <h2>
              Summer of Shipping
            </h2>
            <h3>
              Frontend Developer & Team Member
            </h3>
            <li>Initiative group for students with cancelled internships for Summer 2020 founded by ex-Uber engineer</li>
            <li>Scaled population from 20 members to 600+ students & 70+ mentors globally</li>
            <li>Developed a search feature with FuseJS, enabling users to search internal JSON formatted data</li>

          </div>

          <img className='arrow' src={arrow} alt='arrow'></img>

          <div className='job'>
            <img src={D4} alt='aug date' />
            <h2>
              Edgewell Personal Care
            </h2>
            <h3>
              QA & Systems Engineer Intern
            </h3>
            <li>Wrote documentation for database maintenance and query modification</li>
            <li>Developed internal tools for modifying, adding, and deleting database information using HTML, CSS, JavaScript, and Python</li>
            <li>Proposed and Implemented new repository procedures and development workflow</li>

          </div>
        </div>




      </div>
    </div>
  );
}

export default App;
