import React from 'react';
import '../stylesheets/projects.css';
import { cloudVid } from '../resources/cloudyTut.mp4';
import { prepVid } from '../resources/preeepare.mp4';

const Projects = () => {

    return (
        <div className='Projects'>
            <h1><span className='highlight'>"What projects</span> have you made<span className='highlight'>?"</span></h1>

            <div className='proj fr'>
                <h2 className='proj-name'></h2>
            </div>

            <div className='proj rv'>
                proj div
            </div>
        </div>
    );
};

export default Projects;
