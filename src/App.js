import React, { useState } from 'react';
import Navbar from './components/Navbar'
import Hand from './landing_img.png';
import Pmock from './preeepare_mock.png'
import Cmock from './cloudy_mock.png'
import Avatar from "./Avatar.png"
import "./App.css"
import "./themes.css"

const App = () => {

  const [theme, setTheme] = useState("light")
  const swapThemes = () => {

    if (theme === "light") {
      setTheme("dark")
    }

    else {
      setTheme("light")
    }

  }

  return (
    <div className={"App " + theme}>
      <Navbar colorTheme={theme} onToggleDrill={swapThemes} darkmode={theme !== "light"} />
      <div className='landing-page'>

        <div className='landing-text-container'>
          <div className='center'>
            <div>
              <h1 className="landing-text"><span style={{ color: "var(--highlight)" }}>Van</span>ouphon <br />
                <span style={{ color: "var(--highlight)" }}>S</span>irisouk
                <span style={{ color: "var(--highlight)" }}>.</span></h1>
              <h4><span className='highlight'>Human</span> visualizing <span className='highlight code'>1&0</span> for other humans<span className='highlight'>.</span></h4></div>
          </div>
        </div>

        <img alt="profile on iphone in wooden hand (black)" className="landing-img floating" src={Hand} />

      </div>

      <div style={{ height: "20rem" }} />

      <div className='about-page' id="about">
        <div>

          <h2><span className='highlight'>Who</span> are you<span className='highlight'>?</span></h2>

          <p style={{ width: "30rem", maxWidth: "80vw" }}>
            Hi, I'm Van.
            I'm currently a Junior at University of Connecticut.
            I like to do a couple things, namely, founding a group of collaborative students, known as UConn Stamford Engineer Majors, involving myself with others as a Developer in Summer of Shipping, and working as an Intern at Edgewell Personal Care.
            I'll also be joining Meta (Pka. Facebook) as a Software Engineer Intern in this coming summer.
            When I'm not busy you can find me networking on LinkedIn, scrolling down Twitter, or reading documentation on GitHub.
          </p>

        </div>

        <img src={Avatar} alt="avatar" style={{ margin: "4rem" }} />
      </div>

      <div style={{ height: "30rem" }} />

      <div className='exp-page' id='exp'>
        <h2 style={{ margin: "3rem" }}><span className='highlight'>What experience</span> do you have<span className='highlight'>?</span></h2>

        <div className='job'>
          <div style={{ width: "80vw", maxWidth: "1000px", display: 'flex', justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
            <h5 style={{ margin: '0' }}>Software Engineer Intern</h5>
            <p style={{ fontWeight: '300', margin: '0' }}>6/16/2022 - 8/05/2022</p>
          </div>
          <p style={{ fontWeight: '300' }} className='location'>Facebook / US - New York, NY</p>
          <ul className='job-desc'>
            <li> Incoming Software Engineer Intern for the Responsible AI Team</li>
          </ul>
        </div>

        <div className='job'>
          <div style={{ width: "80vw", maxWidth: "1000px", display: 'flex', justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
            <h5 style={{ margin: '0' }}>QA & Systems Engineer Intern</h5>
            <p style={{ fontWeight: '300', margin: '0' }}>5/20/2021 - 7/17/2021</p>
          </div>
          <p style={{ fontWeight: '300' }} className='location'>Edgewell Personal Care / US - Milford, CT</p>
          <ul className='job-desc'>
            <li> Wrote documentation for database maintenance and query modification</li>
            <li> Developed internal tools for editing database information using HTML, CSS, JavaScript, and Python</li>
            <li> Proposed and Implemented new repository procedures and development workflow</li>
          </ul>
        </div>

      </div>

      <div style={{ height: "30rem" }} />

      <div className='exp-page' id='projects'>
        <h2 style={{ margin: "3rem" }}><span className='highlight'>Which projects</span> have you worked on<span className='highlight'>?</span></h2>

        <div className='project' style={{ flexWrap: 'wrap-reverse' }}>
          <div>
            <h5 style={{ marginBottom: "0" }}><a href='https://hi-van.github.io/preeepare/' target="_blank" rel="noopener noreferrer">Preeepare</a></h5>
            <p style={{width: '80vw', maxWidth: '600px' }}>A resource center to assist students beginning computer science. This project was made using ReactJS, ChartJS, Google Sheets, and FuseJS. It was hosted through GitHub Pages.</p>
          </div>
          <img src={Pmock} className="floating" alt="prepare mock iphone" style={{ margin: '0rem 2rem 0rem 2rem', width: '300px'}} />
        </div>

        <div className='project' style={{ flexWrap: 'wrap' }}>
        <img src={Cmock} className="floating" alt="prepare mock iphone" style={{ margin: '0rem 2rem 0rem 2rem', width: '300px'}} />
          <div>
            <h5 style={{ marginBottom: "0" }}><a href='https://hi-van.github.io/preeepare/' target="_blank" rel="noopener noreferrer">Preeepare</a></h5>
            <p style={{width: '80vw', maxWidth: '600px' }}>A resource center to assist students beginning computer science. This project was made using ReactJS, ChartJS, Google Sheets, and FuseJS. It was hosted through GitHub Pages.</p>
          </div>
        </div>

      </div>


    </div>
  );
};

export default App;
