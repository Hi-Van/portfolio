import './App.css';
import resume from './Vanouphon_Sirisouk_Resume.pdf';
import logo from './perspective.svg';
import Tilt from 'react-parallax-tilt';
import { Switch, Route, Link } from 'react-router-dom';
import { FaGithub, FaTwitter, FaLinkedin, FaFileInvoice } from "react-icons/fa";
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
            <div className='grid'>
              <Link to='/about'><button className='btn-link'>About Me</button></Link>
              <Link to='/experience'><button className='btn-link'>Experience</button></Link>
              <Link to='/projects'><button className='btn-link'>Projects</button></Link>
            </div>
            <div className='btn-container'>
              <a href='https://github.com/Hi-Van' target='_blank' rel='noopener noreferrer'><button className='github-btn'><FaGithub /></button></a>
              <a href='https://twitter.com/Hi_Im_Van' target='_blank' rel='noopener noreferrer'><button className='twitter-btn'><FaTwitter /></button></a>
              <a href='https://www.linkedin.com/in/van-s/' target='_blank' rel='noopener noreferrer'><button className='linkedin-btn'><FaLinkedin /></button></a>
              <a href={resume} download><button className='resume-btn' title='download resume'><FaFileInvoice /></button></a>
            </div>
          </div>
        </div>

        <Switch>
          <Route exact path='/projects'><Projects /></Route>
          <Route exact path='/experience'><Exp /></Route>
          <Route exact path='/about'><About /></Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
