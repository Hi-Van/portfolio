import React from 'react';
import '../stylesheets/about.css';
import { GoMarkGithub } from 'react-icons/go';
import { FaTwitter } from 'react-icons/fa';
import { GrLinkedinOption } from 'react-icons/gr';

const About = () => {
    return (
        <div className='About'>
            <h1><span className='highlight'>"Who</span> are you<span className='highlight'>?"</span></h1>
            <p className='about-txt'>
                Hi, I'm <span className="highlight">Van</span>.
                I'm currently an incoming <span className="highlight">Junior</span> at <a href='https://uconn.edu/' target='_blank' rel='noreferrer'>University of Connecticut</a>.
                I like to do a couple things, namely,
                <span className="highlight"> founding</span> a group of collaborative students, known as <span className="highlight">UConn Stamford Engineer Majors</span>,
                involving myself with others as a <span className="highlight">Developer</span> in <a href='https://summerofshipping.com/' target='_blank' rel='noreferrer'>Summer of Shipping</a>,
                and working as an <span className="highlight">Intern</span> at <a href='https://edgewell.com/' target='_blank' rel='noreferrer'>Edgewell Personal Care</a>.
                When I'm not busy you can find me networking on <a href='https://www.linkedin.com/in/van-s/' target='_blank' rel='noreferrer'>LinkedIn</a>,
                scrolling down <a href='https://twitter.com/Hi_Im_Van' target='_blank' rel='noreferrer'>Twitter</a>,
                or reading documentation on <a href='https://github.com/Hi-Van' target='_blank' rel='noreferrer'>GitHub</a>.
            </p>
            <div>
                <a className='social-link linkedin' href='https://www.linkedin.com/in/van-s/' target='_blank' rel='noreferrer'><GrLinkedinOption/></a>
                <a className='social-link twitter' href='https://twitter.com/Hi_Im_Van' target='_blank' rel='noreferrer'><FaTwitter/></a>
                <a className='social-link github' href='https://github.com/Hi-Van' target='_blank' rel='noreferrer'><GoMarkGithub/></a>
            </div>
        </div>
    );
};

export default About;