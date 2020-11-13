import './App.css';
import logo from './perspective.svg';
import Tilt from 'react-parallax-tilt';
import { Switch, Route, Link } from 'react-router-dom';
import { FaGithub, FaTwitter, FaLinkedin, FaFileInvoice } from "react-icons/fa";

function App() {
  return (
    <div className="App">
      <div className='homepage'>
        <Tilt flipHorizontally={true}>
          <img className='logo' src={logo} alt='logo' />
        </Tilt>
        <div>
          <div className='grid'>
            <Link><button className='btn-link'>About Me</button></Link>
            <Link><button className='btn-link'>Experience</button></Link>
            <Link><button className='btn-link'>Projects</button></Link>
          </div>
          <div className='btn-container'>
            <a href='https://react-icons.github.io/' target='_blank' rel='noopener noreferrer'><button className='github-btn'><FaGithub /></button></a>
            <a href='https://react-icons.github.io/' target='_blank' rel='noopener noreferrer'><button className='twitter-btn'><FaTwitter /></button></a>
            <a href='https://react-icons.github.io/' target='_blank' rel='noopener noreferrer'><button className='linkedin-btn'><FaLinkedin /></button></a>
            <a href='https://react-icons.github.io/' target='_blank' rel='noopener noreferrer'><button className='resume-btn' title='download resume'><FaFileInvoice /></button></a>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
