import React from 'react';

function Skills() {
    return (
        <div id="skills">
            <div className="exp-title" style={{ marginTop: '6em', marginBottom: '2em' }}>SKILLS</div>
            <div className="grid-container">
                <div>
                    <div className="skill-type">DEVELOPMENT</div>
                    <ul className="skills">
                        <li>HTML</li>
                        <li>CSS</li>
                        <li>JavaScript</li>
                        <li>ReactJS</li>
                        <li>NextJS</li>
                        <li>Python</li>
                        <li>R5RS Racket Lisp</li>
                        <li>Bash</li>
                        <li>Git</li>
                        <li>Figma</li>
                        <li>Basic UI Design</li>
                        <li>Basic UX Design</li>
                        <li>Wire Framing</li>
                    </ul>
                </div>

                <div>
                    <div className="skill-type">OTHER</div>
                    <ul className="skills">
                        <li>InkScape</li>
                        <li>SVG Editing</li>
                        <li>Graphic Design</li>
                        <li>Team Coordination</li>
                        <li>Communication</li>
                        <li>Time Management</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Skills;