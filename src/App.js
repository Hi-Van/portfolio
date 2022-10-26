import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hand from "./landing_img.png";
import Pmock from "./preeepare_mock.png";
import Cmock from "./cloudy_mock.png";
import Avatar from "./Avatar.png";
import { AiFillGithub, AiOutlineTwitter, AiFillLinkedin } from "react-icons/ai";
import "./App.css";
import "./themes.css";

const App = () => {
  const [theme, setTheme] = useState("light");
  const swapThemes = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <div className={"App " + theme}>
      <Navbar
        colorTheme={theme}
        onToggleDrill={swapThemes}
        darkmode={theme !== "light"}
      />
      <div className="landing-page">
        <div className="landing-text-container">
          <div className="center">
            <div>
              <h1 className="landing-text">
                <span style={{ color: "var(--highlight)" }}>Van</span>ouphon{" "}
                <br />
                <span style={{ color: "var(--highlight)" }}>S</span>irisouk
                <span style={{ color: "var(--highlight)" }}>.</span>
              </h1>
              <h4>
                <span className="highlight">Human</span> visualizing{" "}
                <span className="highlight code">1&0</span> for other humans
                <span className="highlight">.</span>
              </h4>
            </div>
          </div>
        </div>

        <img
          alt="profile on iphone in wooden hand (black)"
          className="landing-img floating"
          src={Hand}
        />
      </div>

      <div style={{ height: "20rem" }} />

      <div className="about-page" id="about">
        <div>
          <h2>
            <span className="highlight">Who</span> are you
            <span className="highlight">?</span>
          </h2>

          <p style={{ width: "30rem", maxWidth: "80vw" }}>
            Hi, <span className="highlight">I'm Van</span>. I'm currently a <span className="highlight">graduating Senior at University of Connecticut</span>. I
            like to do a couple things, namely, support students in technical skills at the <span className="highlight">Google Student Developer Club</span> at UConn Stamford,
            involving myself with others as a <span className="highlight">Frontend Developer at Summer of Shipping</span>,
            and working as a <span className="highlight">QA & Systems Intern at Edgewell Personal Care</span>, or roaming the streets of New York as a <span className="highlight">Software Engineer Intern at Meta</span>. When I'm not busy you can find me networking on
            LinkedIn, scrolling down Twitter, or reading documentation on
            GitHub.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "nowrap",
            }}
          >
            <a
              style={{
                color: "#ffffff",
                backgroundColor: "#0072B1",
                margin: "0rem 0.5rem 0rem 0rem",
              }}
              className="social-btn"
              href="https://www.linkedin.com/in/van-s/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillLinkedin />
            </a>

            <a
              style={{
                color: "#ffffff",
                backgroundColor: "#1DA1F2",
                margin: "0rem 0.5rem 0rem 0.5rem",
              }}
              className="social-btn"
              href="https://twitter.com/Hi_Im_Van"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiOutlineTwitter />
            </a>

            <a
              style={{
                color: "#ffffff",
                backgroundColor: "#171515",
                margin: "0rem 0.5rem 0rem 0.5rem",
              }}
              className="social-btn"
              href="https://github.com/Hi-Van"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillGithub />
            </a>
          </div>
        </div>

        <img src={Avatar} alt="avatar" style={{ margin: "4rem" }} />
      </div>

      <div style={{ height: "30rem" }} />

      <div className="exp-page" id="exp">
        <h2 style={{ margin: "3rem" }}>
          <span className="highlight">What experience</span> do you have
          <span className="highlight">?</span>
        </h2>

        <div className="job">
          <div
            style={{
              width: "80vw",
              maxWidth: "1000px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <h5 style={{ margin: "0" }}>Synchrony Financial</h5>
            <p style={{ fontWeight: "300", margin: "0" }}>
              9/06/2022 - <span>current</span>
            </p>
          </div>
          <p style={{ fontWeight: "300" }} className="location">
            <b>Software Engineer Intern / US - Stamford, CT </b>
          </p>
          <ul className="job-desc">
            <li>
              Software Engineer Intern on backend Java API systems
            </li>
            <li>
              Worked with requests and API codebase utilizing Java Springboot, Postman, Jenkins, and Maven 
            </li>
          </ul>
        </div>

        <div className="job">
          <div
            style={{
              width: "80vw",
              maxWidth: "1000px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <h5 style={{ margin: "0" }}>Meta</h5>
            <p style={{ fontWeight: "300", margin: "0" }}>
              6/16/2022 - 8/05/2022
            </p>
          </div>
          <p style={{ fontWeight: "300" }} className="location">
            <b>Software Engineer Intern / US - New York, NY</b>
          </p>
          <ul className="job-desc">
            <li>
              Implemented backend APIs to serve Machine Learning meta data for
              clients across Meta AI.
            </li>
            <li>
              Improved development efficiency for calculating confusion matrices
              and label distributions by 350%, leading to 3x reduction in final
              build size per module
            </li>
            <li>
              Created data pipelines from internal machine learning platforms
              that can handle 600,000 queries per second
            </li>
            <li>Integrated key testing procedures into CI/CD pipeline</li>
            <li>
              Built User Interfaces and Data Visualizations utilizing React,
              Highcharts, Hack, GraphQL, Relay, and Internal Libraries
            </li>
          </ul>
        </div>

        <div className="job">
          <div
            style={{
              width: "80vw",
              maxWidth: "1000px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <h5 style={{ margin: "0" }}>Edgewell Personal Care</h5>
            <p style={{ fontWeight: "300", margin: "0" }}>
              5/20/2021 - 7/17/2021
            </p>
          </div>
          <p style={{ fontWeight: "300" }} className="location">
            <b>QA & Systems Engineer Intern / US - Milford, CT</b>
          </p>
          <ul className="job-desc">
            <li>
              {" "}
              Wrote documentation for database maintenance and query
              modification
            </li>
            <li>
              {" "}
              Developed internal tools for editing database information using
              HTML, CSS, JavaScript, and Python
            </li>
            <li>
              {" "}
              Proposed and Implemented new repository procedures and development
              workflow
            </li>
          </ul>
        </div>
      </div>

      <div style={{ height: "30rem" }} />

      <div className="exp-page" id="projects">
        <h2 style={{ margin: "3rem" }}>
          <span className="highlight">Which projects</span> have you worked on
          <span className="highlight">?</span>
        </h2>

        <div className="project" style={{ flexWrap: "wrap-reverse" }}>
          <div>
            <h5 style={{ marginBottom: "0" }}>
              <a
                href="https://hi-van.github.io/preeepare/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Preeepare
              </a>
            </h5>
            <p style={{ width: "80vw", maxWidth: "600px" }}>
              A resource center to assist students beginning computer science.
              This project was made using ReactJS, ChartJS, Google Sheets, and
              FuseJS. It was hosted through GitHub Pages.
            </p>
          </div>
          <img
            src={Pmock}
            className="floating"
            alt="prepare mock iphone"
            style={{ margin: "0rem 2rem 0rem 2rem", width: "300px" }}
          />
        </div>

        <div className="project" style={{ flexWrap: "wrap" }}>
          <img
            src={Cmock}
            className="floating"
            alt="prepare mock iphone"
            style={{ margin: "0rem 2rem 0rem 2rem", width: "300px" }}
          />
          <div>
            <h5 style={{ marginBottom: "0" }}>
              <a
                href="https://hi-van.github.io/preeepare/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cloudy
              </a>
            </h5>
            <p style={{ width: "80vw", maxWidth: "600px" }}>
              Sometimes, I like to make random things, this is one of them.
              Cloudy, a word cloud generator, built with ReactJS, hosted by
              Heroku.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
