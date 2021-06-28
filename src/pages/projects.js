import React from 'react';
import '../stylesheets/projects.css';
import cloudVid from '../resources/cloudyTut.mp4';
import prepVid from '../resources/preeepare.mp4';
import portVid from '../resources/portShow.mp4';
import { HiOutlineCode } from 'react-icons/hi';
import { FiLink } from 'react-icons/fi';
import { Fade } from 'react-reveal';

const Projects = () => {

    return (
        <div className='Projects'>
            <h1 style={{ padding: '1.5rem' }}><span className='highlight'>"What projects</span> have you made<span className='highlight'>?"</span></h1>

            <Fade>
                <div className='proj fr'>
                    <div style={{ background: '#dbd6f5' }} className='video-bg'><video className='proj-video' autoPlay={true} muted loop type="video/mp4" src={portVid} /></div>
                    <div>
                        <h2 className='proj-name'>Portfolio Webiste v7</h2>
                        <p className='proj-desc'>The <span className='highlight'>website</span> you're viewing right now! It hosts lots of <span className='highlight'>information about me</span> and is made with <span className='highlight'>ReactJS</span>. I hosted it with <span className='highlight'>GitHub Pages</span>.</p>
                        <div>
                            <a className='proj-link' href='https://github.com/Hi-Van/portfolio' target='_blank' rel='noreferrer'><HiOutlineCode /></a>
                        </div>
                    </div>
                </div>
            </Fade>

            <Fade>
                <div className='proj rv'>
                    <div style={{ width: 'auto' }}>
                        <h2 className='proj-name'>Preeepare</h2>
                        <p className='proj-desc'>A <span className='highlight'>resource center</span> to assist students beginning computer science. This project was made using <span className='highlight'>ReactJS</span>, <span className='highlight'>ChartJS</span>, <span className='highlight'>Google Sheets</span>, and <span className='highlight'>FuseJS</span>. It was hosted through <span className='highlight'>GitHub Pages</span>.</p>
                        <div>
                            <a className='proj-link' href='https://hi-van.github.io/preeepare/' target='_blank' rel='noreferrer'><FiLink /></a>
                            <a className='proj-link' href='https://github.com/Hi-Van/preeepare' target='_blank' rel='noreferrer'><HiOutlineCode /></a>
                        </div>
                    </div>
                    <div style={{ background: '#ced7e8' }} className='video-bg'><video className='proj-video' autoPlay={true} muted loop type="video/mp4" src={prepVid} /></div>
                </div>
            </Fade>

            <Fade>
                <div className='proj fr'>
                    <div style={{ background: '#2f3d94' }} className='video-bg'><video className='proj-video' autoPlay={true} muted loop type="video/mp4" src={cloudVid} /></div>
                    <div>
                        <h2 className='proj-name'>Cloudy</h2>
                        <p className='proj-desc'>A <span className='highlight'>word cloud generator</span> built using <span className='highlight'>Material UI</span>, <span className='highlight'>ReactJS</span>, and <span className='highlight'>am4Charts</span>. This project was hosted on <span className='highlight'>Heroku</span>.</p>
                        <div>
                            <a className='proj-link' href='https://cloudy-word-cloud.herokuapp.com/' target='_blank' rel='noreferrer'><FiLink /></a>
                            <a className='proj-link' href='https://github.com/Hi-Van/Word-Cloud/tree/master/word-cloud' target='_blank' rel='noreferrer'><HiOutlineCode /></a>
                        </div>
                    </div>
                </div>
            </Fade>
        </div>
    );
};

export default Projects;
