import Fade from 'react-reveal/Fade';
import './exp.css';

function Exp() {
    return (
        <div className='projects'>
            <div className='space' id='experience' />
            <Fade bottom><h1 style={{ margin: '4rem, 3rem, 4rem, 3rem', textAlign: 'center', fontWeight: '400' }}>EXPERIENCE <span>💼</span></h1></Fade>
            <Fade bottom>
                <div className='job'>
                    <div>
                        <h1><b>Summer of Shipping</b></h1>
                        <h2>Core Team</h2>
                        <h3>May 2020 – Sep 2020   //  <a href='https://summerofshipping.com/' target='_blank' rel='nooperner noreferrer'>summerofshipping.com</a></h3>
                        <ul>
                            <li>Initiative group for students with cancelled internships for Summer 2020 founded by ex-Uber engineer</li>
                            <li>Scaled population from 20 members to 600+ students & 70+ mentors globally</li>
                            <li>Developed prototype design in Figma software, resulting in a responsive site</li>
                            <li>Developed a search feature with FuseJS, enabling users to search an internal JSON file of media links</li>
                        </ul>
                    </div>
                </div>
            </Fade>

            <Fade bottom>
                <div className='job'>
                    <div>
                        <h1><b>University of Connecticut</b></h1>
                        <h2>CS & Mathematics Tutor</h2>
                        <h3>Feb 2020 – May 2020   //  Stamford, CT</h3>
                        <ul>
                            <li>Assisted in analyzing and debugging code with students</li>
                            <li>Explained technical concepts and issues to students, clarifying confusion set upon student knowledge</li>
                            <li>Created study plans based off of Computer Science & Calculus curriculum for students</li>
                        </ul>
                    </div>
                </div>
            </Fade>

            <Fade bottom>
                <div className='job'>
                    <div>
                        <h1><b>UConn Engineer Majors</b></h1>
                        <h2>Founder</h2>
                        <h3>Aug 2019 – Present   //  Stamford, CT</h3>
                        <ul>
                            <li>Collaborative group of students at University of Connecticut Stamford Regional Campus</li>
                            <li>Scaled population from 14 students to 40+ students</li>
                            <li>Directed several teams of students, resulting in an overall reduction in stress & workload</li>
                            <li>Lead a team of 13+ collaborative students, decreasing time spent on assignments by 30% - 40% on avg.</li>
                        </ul>
                    </div>
                </div>
            </Fade>
        </div>
    );
}

export default Exp;