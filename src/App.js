import React, { useState } from 'react';
import Navbar from './components/Navbar'
import Hand from './landing_img.png';
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

      <div style={{height: "20rem"}}/>

      <div className='about-page' id="about">
        <div>

          <h2><span className='highlight'>Who</span> are you<span className='highlight'>?</span></h2>
          
          <p style={{width: "30rem", maxWidth: "80vw"}}>
            Hi, I'm Van.
            I'm currently a Junior at University of Connecticut.
            I like to do a couple things, namely, founding a group of collaborative students, known as UConn Stamford Engineer Majors, involving myself with others as a Developer in Summer of Shipping, and working as an Intern at Edgewell Personal Care.
            I'll also be joining Meta (Pka. Facebook) as a Software Engineer Intern in this coming summer.
            When I'm not busy you can find me networking on LinkedIn, scrolling down Twitter, or reading documentation on GitHub.
          </p>

        </div>

        <img src={Avatar} alt="avatar" style={{margin:"4rem"}}/>
      </div>
    </div>
  );
};

export default App;
