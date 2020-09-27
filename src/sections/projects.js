import React from 'react';
import cloudy from '../cloudy.JPG';
import notpicky from '../not-picky.JPG';
import portdep from '../port-dep.JPG';
import port from '../port.JPG';
import runtime from '../runtime.JPG';
import wiki from '../sos-wiki.JPG';

function Projects() {
    return (
        <div id="projects">
            <div className="exp-title" style={{ marginTop: '6em', marginBottom: '2em', textAlign: 'center' }}>PROJECTS</div>
            <div className="grid-container" style={{ marginTop: '4em', paddingBottom: '8em' }}>
                <img src={cloudy} alt="cloudy project" />
                <div>
                    <div className="project-name">
                        <a href="https://cloudy-word-cloud.herokuapp.com/" target="_blank" rel="noopener noreferrer">
                            CLOUDY
                        </a>
                    </div>
                    <p className="project-desc">A word cloud generator web application, hosted on Heroku. <br />
                    Built using ReactJS, Material UI, and am4Charts Library</p>
                    <div className="button-list">
                        <a href="https://cloudy-word-cloud.herokuapp.com/" target="_blank" rel="noopener noreferrer"><button>DEMO</button></a>
                        <a href="https://github.com/Hi-Van/Word-Cloud/tree/master/word-cloud" target="_blank" rel="noopener noreferrer"><button>CODE</button></a>
                    </div>
                </div>
            </div>

            <div className="grid-container" style={{ marginTop: '8em', paddingBottom: '8em' }}>
                <img src={notpicky} alt="not-picky project" />
                <div>
                    <div className="project-name">
                        <a href="https://not-picky.herokuapp.com/" target="_blank" rel="noopener noreferrer">
                            !PICKY // IN PROGRESS
                        </a>
                    </div>
                    <p className="project-desc">A restaurant picker based within a react application.<br />
                    Built using ReactJS, Material UI, Google Maps API, Google Places API, and Google GeoCode API</p>
                    <div className="button-list">
                        <a href="https://not-picky.herokuapp.com/" target="_blank" rel="noopener noreferrer"><button>DEMO</button></a>
                        <a href="https://github.com/Hi-Van/Not-Picky/tree/master/my-app" target="_blank" rel="noopener noreferrer"><button>CODE</button></a>
                    </div>
                </div>
            </div>

            <div className="grid-container" style={{ marginTop: '8em', paddingBottom: '8em' }}>
                <img src={wiki} alt="sos-wiki project" />
                <div>
                    <div className="project-name">
                        <a href="https://summerofshipping.com/" target="_blank" rel="noopener noreferrer">
                            SUMMER OF SHIPPING LANDING SITE
                        </a>
                    </div>
                    <p className="project-desc">A website that hosts projects and information about summer of shipping. <br />
                    Built using NextJS, FuseJS, JSON, and Figma</p>
                    <div className="button-list">
                        <a href="https://summerofshipping.com/" target="_blank" rel="noopener noreferrer"><button>DEMO</button></a>
                        <a href="https://github.com/Hi-Van/sos-landing" target="_blank" rel="noopener noreferrer"><button>CODE</button></a>
                    </div>
                </div>
            </div>

            <div className="grid-container" style={{ marginTop: '8em', paddingBottom: '8em' }}>
                <img src={runtime} alt="runtime project" />
                <div>
                    <div className="project-name">
                        <a href="https://hi-van.github.io/runtime-sheet/" target="_blank" rel="noopener noreferrer">
                            RUNTIME
                        </a>
                    </div>
                    <p className="project-desc">A website that logs JavaScript and Python code for data structures and algorithms, along with worst case runtimes. <br />
                    Built using ReactJS and Material UI</p>
                    <div className="button-list">
                        <a href="https://hi-van.github.io/runtime-sheet/" target="_blank" rel="noopener noreferrer"><button>DEMO</button></a>
                        <a href="https://github.com/Hi-Van/runtime-sheet" target="_blank" rel="noopener noreferrer"><button>CODE</button></a>
                    </div>
                </div>
            </div>

            <div className="grid-container" style={{ marginTop: '8em', paddingBottom: '8em' }}>
                <img src={portdep} alt="port-dep project" />
                <div>
                    <div className="project-name">
                        <a href="https://hi-van.github.io/" target="_blank" rel="noopener noreferrer">
                            PORTFOLIO WEBSITE V3
                        </a>
                    </div>
                    <p className="project-desc">My old portfolio website, used to host my projects and information about myself. <br />
                    Built using HTML, CSS, and JavaScript</p>
                    <div className="button-list">
                        <a href="https://hi-van.github.io/" target="_blank" rel="noopener noreferrer"><button>DEMO</button></a>
                        <a href="https://github.com/Hi-Van/hi-van.github.io" target="_blank" rel="noopener noreferrer"><button>CODE</button></a>
                    </div>
                </div>
            </div>

            <div className="grid-container" style={{ marginTop: '8em', paddingBottom: '8em' }}>
                <img src={port} alt="portfolio project" />
                <div>
                    <div className="project-name">
                        <a href="https://hi-van.github.io/" target="_blank" rel="noopener noreferrer">
                            PORTFOLIO WEBSITE V4
                        </a>
                    </div>
                    <p className="project-desc">The newest iteration of my portfolio website, hosted by Github Pages. <br />
                    Built using CSS and ReactJS</p>
                    <div className="button-list">
                        <a href="https://hi-van.github.io/portfolio" target="_blank" rel="noopener noreferrer"><button>DEMO</button></a>
                        <a href="https://github.com/Hi-Van/portfolio" target="_blank" rel="noopener noreferrer"><button>CODE</button></a>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Projects;