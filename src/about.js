import Fade from 'react-reveal/Fade';
import { SiLeetcode } from 'react-icons/si';
import { VscMortarBoard } from 'react-icons/vsc';

function About() {
    return (
        <div className='about' >
            <div className='space' />
            <div className='space' id='about' />
            <div className='space' />
            <Fade bottom><h1 style={{ marginBottom: '4rem', textAlign: 'center', fontWeight: '400' }}>ABOUT ME <span className='wave'>👋</span></h1></Fade>
            <Fade bottom>
                <h3>Hey I'm Van...</h3>
                <p className='about-txt'>
                    I'm currently a <b>sophomore</b> at the <b><a href='https://uconn.edu/' target='_blank' rel='noopener noreferrer'>University of Connecticut</a></b>.
                    I am the <b>founder</b> of the <b>UConn Stamford Engineer Majors</b>, a group of <b>collaborative students</b> at the UConn Stamford campus.
                    I've recently been a part of an initiative group called <b>Summer of Shipping</b> as a core <b>team member</b> and <b>frontend developer</b>.
                    When I'm not drowning in my coursework, I like to work out and watch YouTube tutorials I'll never do.
                    You can also find me scrolling through <b><a href='https://twitter.com/Hi_Im_Van' target='_blank' rel='noopener noreferrer'>Twitter</a></b>, making commits on <b><a href='https://github.com/Hi-Van' target='_blank' rel='noopener noreferrer'>GitHub</a></b>, or networking on <b><a href='https://www.linkedin.com/in/van-s/' target='_blank' rel='noopener noreferrer'>LinkedIn</a></b>.
            </p>
            </Fade>
            <div className='space' />

            <Fade bottom>
                <h3>Here's Some Facts 🧪</h3>

                <div className='grid-card'>
                    <div className='card'>
                        <h2><a href='https://leetcode.com/Hi-Van/' target='_blank' rel='noreferrer'><SiLeetcode />LeetCode</a></h2>
                        <p style={{ fontFamily: 'montserrat' }}>Solved: 98</p>
                        <div className='percentbar' style={{ backgroundColor: '#6acc6e', width: '64%' }} />
                        <div className='percentbar' style={{ backgroundColor: '#fab650', width: '35%' }} />
                        <div className='percentbar' style={{ backgroundColor: '#de6464', width: '1%' }} />
                    </div>

                    <div className='card'>
                        <h2><a href='https://binarysearch.com/@/Hi-Van' target='_blank' rel='noreferrer'><VscMortarBoard />BinarySearch</a></h2>
                        <p style={{ fontFamily: 'montserrat' }}>Solved: 105</p>
                        <div className='percentbar' style={{ backgroundColor: '#6acc6e', width: '62%' }} />
                        <div className='percentbar' style={{ backgroundColor: '#fab650', width: '38%' }} />
                        <div className='percentbar' style={{ backgroundColor: '#de6464', width: '0%' }} />
                    </div>
                </div>
            </Fade>

            <div className='space' />
            <Fade bottom>
                <h3>Some of my favorite songs include...</h3>
            </Fade>

            <div className='grid'>
                <Fade left>
                    <iframe src="https://open.spotify.com/embed/track/37HRd8gZ7F1l1Awm6debTv" frameborder="0" allowtransparency="true" allow="encrypted-media" title='play song' />
                </Fade>
                <Fade bottom>
                    <iframe src="https://open.spotify.com/embed/track/5dn6QANKbf76pANGjMBida" frameborder="0" allowtransparency="true" allow="encrypted-media" title='play song' />
                </Fade>
                <Fade right>
                    <iframe src="https://open.spotify.com/embed/track/69KERH8EU5P2VwxWlmOVcU" frameborder="0" allowtransparency="true" allow="encrypted-media" title='play song' />
                </Fade>
            </div>
        </div>
    );
}

export default About;