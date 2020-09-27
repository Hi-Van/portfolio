import React from 'react';
import './App.css';
import { Link } from 'react-scroll';
import { Resume } from './Resume_Vanouphon_Sirisouk.pdf';

function App() {
  return (
    <div className="App">
      <div className="content-wrapper">
        <div className="title">VAN SIRISOUK</div>
        <div className="subtitle">Woah! Hey there stranger <span role="img" className="wave" aria-label="wave">👋</span></div>
        <div className="button-list">
          <Link to="about-me" smooth={true} duration={600}><button>About Me</button></Link>
          <a href={Resume} target="_blank" rel="noopener noreferrer"><button>Resume</button></a>
          <Link to="about-me" smooth={true} duration={600}><button>Experience</button></Link>
          <Link to="about-me" smooth={true} duration={600}><button>Skills</button></Link>
          <Link to="about-me" smooth={true} duration={600}><button>Projects</button></Link>
        </div>

        <div classname="about-section" id="about-me">
          <div className="about-title">ABOUT ME</div>
          <div className="about-text">
            Hey, I'm Van.
          I'm currently a sophomore at the <a className="reference" href="https://uconn.edu/" target="_blank" rel="noopener noreferrer">University of Connecticut. </a>
          I'm the founder of the UConn Stamford Engineer Majors, a group of collaborative students at the UConn Stamford campus.
          I've recently been a part of an initiative group called <a className="reference" href="https://summerofshipping.com/" target="_blank" rel="noopener noreferrer">Summer of Shipping </a> as a core team member and frontend developer.
          You can find me scrolling through Twitter, making commits on projects on GitHub, or increasing the size of my network on LinkedIn.
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
