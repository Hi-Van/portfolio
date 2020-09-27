import React from 'react';
import './App.css';
import { Link } from 'react-scroll';
import About from './sections/about-me';
import Exp from './sections/experience';
import Skills from './sections/skills';
import Projects from './sections/projects';

function App() {
  return (
    <div className="App">
      <div className="content-wrapper">
        <div id="home">
          <div className="title">VAN SIRISOUK</div>
          <div className="subtitle">Woah! Hey there stranger <span role="img" className="wave" aria-label="wave">👋</span></div>
          <div className="button-list">
            <Link to="about-me" smooth={true} duration={1000}><button>About Me</button></Link>
            <a href="https://drive.google.com/file/d/1CGvn6LIRuMlptoxdWCQZpyj8pj1KiD-N/view?usp=sharing" target="_blank" rel="noopener noreferrer"><button>Resume</button></a>
            <Link to="experience" smooth={true} duration={1000}><button>Experience</button></Link>
            <Link to="skills" smooth={true} duration={1000}><button>Skills</button></Link>
            <Link to="projects" smooth={true} duration={1000}><button>Projects</button></Link>
          </div>
        </div>
        <About />
        <Exp />
        <Skills />
        <Projects />
      </div>
    </div>
  );
}

export default App;
