import React from 'react';
import '../stylesheets/exp.css';
import { Fade } from 'react-reveal';

const Exp = () => {
    return (
        <div className='Experience'>
            <Fade>
                <h1><span className='highlight'>"What experience</span> do you have<span className='highlight'>?"</span></h1>
            </Fade>

            <Fade left>
                <div className='job'>
                    <h2 className='job-company'>UConn Stamford Engineer Majors</h2>
                    <h2 className='job-title'>Founder <br /> Aug 2019 - Present</h2>
                    <p><span className='highlight'>Scaled</span> population from <span className='highlight'>14+</span> students to <span className='highlight'>40+</span> students</p>
                    <p><span className='highlight'>Directed</span> several <span className='highlight'>teams</span> of students, resulting in an overall <span className='highlight'>reduction</span> in <span className='highlight'>stress & workload</span></p>
                    <p><span className='highlight'>Lead</span> a team of <span className='highlight'>13</span> collaborative students, <span className='highlight'>decreasing time</span> spent on assignments by <span className='highlight'>30% - 40%</span> on avg.</p>
                </div>
            </Fade>

            <Fade left>
                <div className='job'>
                    <h2 className='job-company'>Edgewell Personal Care</h2>
                    <h2 className='job-title'>QA & Systems Intern <br /> May 2021 - June 2021</h2>
                    <p><span className='highlight'>Wrote</span> documentation for <span className='highlight'>database maintenance</span> and <span className='highlight'>query modification</span></p>
                    <p><span className='highlight'>Developed</span> internal tools for <span className='highlight'>modifying</span>, <span className='highlight'>adding</span>, and <span className='highlight'>deleting</span> <span className='highlight'>database information</span> using <span className='highlight'>HTML</span>, <span className='highlight'>CSS</span>, <span className='highlight'>JavaScript</span>, and <span className='highlight'>Python</span></p>
                    <p><span className='highlight'>Proposed and Implemented</span> new <span className='highlight'>repository procedures</span> and <span className='highlight'>development workflow</span></p>
                </div>
            </Fade>

            <Fade left>
                <div className='job'>
                    <h2 className='job-company'>Summer of Shipping</h2>
                    <h2 className='job-title'>Frontend Developer & Team Member <br /> May 2020 - Sep 2020</h2>
                    <p><span className='highlight'>Initiative group</span> for students with cancelled internships for Summer 2020 founded by ex-<span className='highlight'>Uber engineer</span></p>
                    <p><span className='highlight'>Scaled</span> population from <span className='highlight'>20</span> members to <span className='highlight'>600+</span> students & <span className='highlight'>70+</span> mentors globally</p>
                    <p><span className='highlight'>Developed</span> a <span className='highlight'>search feature</span> with <span className='highlight'>FuseJS</span>, enabling users to search internal <span className='highlight'>JSON</span> formatted data</p>
                </div>
            </Fade>

            <Fade left>
                <div className='job'>
                    <h2 className='job-company'>University of Connecticut</h2>
                    <h2 className='job-title'>CS & Mathematics Tutor <br /> Feb 2020 - May 2020</h2>
                    <p><span className='highlight'>Assisted</span> in <span className='highlight'>analyzing</span> and <span className='highlight'>debugging</span> code with students</p>
                    <p><span className='highlight'>Communicated</span> technical <span className='highlight'>concepts</span> and <span className='highlight'>issues</span> to students, clarifying confusion with students</p>
                    <p>Created study plans based off of <span className='highlight'>Computer Science & Calculus</span> curriculum for students</p>
                </div>
            </Fade>
        </div>
    );
};

export default Exp;