import './project.css';
import prep from './preeepare.PNG';
import cloudy from './cloudy.JPG';
import picky from './not-picky.JPG';
import oldPort from './port-dep.JPG';
import run from './runtime.JPG';
import wiki from './sos-wiki.JPG';
import { FaLink, FaBookOpen } from "react-icons/fa";
import Fade from 'react-reveal/Fade';

function Projects() {
    return (
        <div className='projects'>
            <Fade bottom>
                <div className='proj'>
                    <img className='proj-img' src={prep} alt='prep' />
                    <div>
                        <h1>Preeepare</h1>
                        <p>Preeepare is an interview prep visualization tool and developer resource center.
                        Built utilizing ReactJS, ChartJS, and Google Docs
              </p>
                        <div>
                            <a href='https://github.com/Hi-Van/preeepare' target='_blank' rel='noopener noreferrer'><button className='proj-link' title='visit documentation'><FaBookOpen /></button></a>
                            <a href='https://hi-van.github.io/preeepare/' target='_blank' rel='noopener noreferrer'><button className='proj-link' title='visit project'><FaLink /></button></a>
                        </div>
                    </div>
                </div>
            </Fade>

            <Fade bottom>
                <div className='proj'>
                    <img className='proj-img' src={cloudy} alt='prep' />
                    <div>
                        <h1>Cloudy</h1>
                        <p>A word cloud generator web application, hosted on Heroku.
                        Built using ReactJS, Material UI, and am4Charts Library
              </p>
                        <div>
                            <a href='https://github.com/Hi-Van/Word-Cloud/tree/master/word-cloud' target='_blank' rel='noopener noreferrer'><button className='proj-link' title='visit documentation'><FaBookOpen /></button></a>
                            <a href='https://cloudy-word-cloud.herokuapp.com/' target='_blank' rel='noopener noreferrer'><button className='proj-link' title='visit project'><FaLink /></button></a>
                        </div>
                    </div>
                </div>
            </Fade>

            <Fade bottom>
                <div className='proj'>
                    <img className='proj-img' src={picky} alt='prep' />
                    <div>
                        <h1>!Picky // IN PROGRESS</h1>
                        <p>A restaurant picker based within a react application.
                        Built using ReactJS, Material UI, Google Maps API, Google Places API, and Google GeoCode API
              </p>
                        <div>
                            <a href='https://github.com/Hi-Van/Not-Picky/tree/master/my-app' target='_blank' rel='noopener noreferrer'><button className='proj-link' title='visit documentation'><FaBookOpen /></button></a>
                            <a href='https://not-picky.herokuapp.com/' target='_blank' rel='noopener noreferrer'><button className='proj-link' title='visit project'><FaLink /></button></a>
                        </div>
                    </div>
                </div>
            </Fade>

            <Fade bottom>
                <div className='proj'>
                    <img className='proj-img' src={wiki} alt='prep' />
                    <div>
                        <h1>Summer of Shipping Landing Site</h1>
                        <p>A website that hosts projects and information about summer of shipping.
                        Built using NextJS, FuseJS, JSON, and Figma
                        </p>
                        <div>
                            <a href='https://github.com/Hi-Van/sos-landing' target='_blank' rel='noopener noreferrer'><button className='proj-link' title='visit documentation'><FaBookOpen /></button></a>
                            <a href='https://summerofshipping.com/' target='_blank' rel='noopener noreferrer'><button className='proj-link' title='visit project'><FaLink /></button></a>
                        </div>
                    </div>
                </div>
            </Fade>

            <Fade bottom>
                <div className='proj'>
                    <img className='proj-img' src={run} alt='prep' />
                    <div>
                        <h1>Runtime</h1>
                        <p>A website that logs JavaScript and Python code for data structures and algorithms, along with worst case runtimes.
                        Built using ReactJS and Material UI
              </p>
                        <div>
                            <a href='https://github.com/Hi-Van/sos-landing' target='_blank' rel='noopener noreferrer'><button className='proj-link' title='visit documentation'><FaBookOpen /></button></a>
                            <a href='https://summerofshipping.com/' target='_blank' rel='noopener noreferrer'><button className='proj-link' title='visit project'><FaLink /></button></a>
                        </div>
                    </div>
                </div>
            </Fade>

            <Fade bottom>
                <div className='proj'>
                    <img className='proj-img' src={oldPort} alt='prep' />
                    <div>
                        <h1>Portfolio Website v3</h1>
                        <p>My old portfolio website, used to host my projects and information about myself.
                        Built using HTML, CSS, and JavaScript
              </p>
                        <div>
                            <a href='https://github.com/Hi-Van/sos-landing' target='_blank' rel='noopener noreferrer'><button className='proj-link' title='visit documentation'><FaBookOpen /></button></a>
                            <a href='https://summerofshipping.com/' target='_blank' rel='noopener noreferrer'><button className='proj-link' title='visit project'><FaLink /></button></a>
                        </div>
                    </div>
                </div>
            </Fade>

        </div>
    );
}

export default Projects;