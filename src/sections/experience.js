import React from 'react';

function Exp() {
    return (
        <div id="experience">
            <div className="exp-title" style={{ textAlign: 'center' }}>EXPERIENCE</div>

            <div className="position">
                <div className="position-company">SUMMER OF SHIPPING</div>
                <p className="position-title-date">
                    CORE TEAM & FRONTEND DEVELOPER 	&nbsp;	// &nbsp;
                    May 2020 – Aug 2020 	&nbsp;	// &nbsp;
                    <a className="reference" href="https://summerofshipping.com" target="_blank" rel="noopener noreferrer">summerofshipping.com</a>
            </p>
                <ul className="position-details">
                    <li>Initiative group for students with cancelled internships for Summer 2020 founded by ex-Uber engineer</li>
                    <li>Scaled population from 20 members to 600+ students & 70+ mentors globally</li>
                    <li>Developed prototype design in Figma software, resulting in a responsive site</li>
                    <li>Developed a search feature with FuseJS, enabling users to search an internal JSON file of media links</li>
                </ul>
            </div>

            <div className="position">
                <div className="position-company">UNIVERSITY OF CONNECTICUT</div>
                <p className="position-title-date">
                    CS & MATHEMATICS TUTOR 	&nbsp;	// &nbsp;
                    Feb 2020 – May 2020 	&nbsp;	// &nbsp;
                    Stamford, CT
            </p>
                <ul className="position-details">
                    <li>Assisted in analyzing and debugging code with students</li>
                    <li>Explained technical concepts and issues to students, clarifying confusion set upon student knowledge</li>
                    <li>Created study plans based off of Computer Science & Calculus curriculum for students</li>
                </ul>
            </div>

            <div className="position">
                <div className="position-company">UCONN ENGINEER MAJORS</div>
                <p className="position-title-date">
                    FOUNDER 	&nbsp;	// &nbsp;
                    Aug 2019 – PRESENT 	&nbsp;	// &nbsp;
                    Stamford, CT
            </p>
                <ul className="position-details">
                    <li>Collaborative group of students at University of Connecticut Stamford Regional Campus</li>
                    <li>Scaled population from 14+ students to 40+ students</li>
                    <li>Directed several teams of students, resulting in an overall reduction in stress & workload</li>
                    <li>Lead a team of 13 collaborative students, decreasing time spent on assignments by 30% - 40% on avg.</li>
                </ul>
            </div>
        </div>
    );
}

export default Exp;