import logo from './media/landing-logo.svg';
import { BsFillArrowDownRightCircleFill, BsTwitter, BsGithub } from 'react-icons/bs';
import { FaLinkedinIn } from 'react-icons/fa';
import './App.css';

function App() {
  return (
    <div className="App">

      <div className='content'>

        <div className='page'>

          <img className='logo' src={logo} alt="logo" />

          <div className='flex specialLeft'>
            <a className="btn yellow pill" href="https://google.com">Learn More<BsFillArrowDownRightCircleFill /></a>

            <div className='flex'>
              <a className="btn social rounded" href="https://google.com"><FaLinkedinIn /></a>
              <a className="btn social rounded" href="https://google.com"><BsTwitter /></a>
              <a className="btn social rounded" href="https://google.com"><BsGithub /></a>
            </div>

          </div>

        </div>

        <div className='page'>
          <div className='flex'>

          </div>
        </div>




      </div>
    </div>
  );
}

export default App;
