import './project.css';
import { useState } from 'react';
import newPort from './new-port.PNG';
import { FaLink, FaBookOpen } from "react-icons/fa";
import Fade from 'react-reveal/Fade';
import Fuse from 'fuse.js';
import links from './projects.json';

function Projects() {

    const [query, setQuery] = useState('');
    const [test, setTest] = useState('');

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setQuery(test);
    }

    const fuse = new Fuse(links, {
        keys: [
            'title',
            'tech',
            'desc'
        ],
        threshold: '0.35'
    })

    const results = fuse.search(query);

    const linkResult = query ? results.map(result => result.item) : links;

    return (
        <div className='projects'>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Search Wiki.." value={test} onChange={e => setTest(e.target.value)} className='search' />
                <input type="submit" value="Search" />
            </form>

            <div className="grid-search">
                <button className="search-btn am4">am4Charts</button>
                <button className="search-btn HTML">HTML</button>
                <button className="search-btn CSS">CSS</button>
                <button className="search-btn JS">JavaScript</button>
                <button className="search-btn Mat">Material UI</button>
                <button className="search-btn Figma">Figma</button>
                <button className="search-btn Fuse">FuseJS</button>
                <button className="search-btn React">ReactJS</button>
                <button className="search-btn Heroku">Heroku</button>
                <button className="search-btn Next">NextJS</button>
                <button className="search-btn Chart">ChartJS</button>
                <button className="search-btn Google">Google</button>
            </div>

            {linkResult.map(card => {
                const { title, link } = card;
                return (
                    <a key={title} href={link} target='_blank' rel='noopener noreferrer'>
                        <button className='btn-info'>{title}</button>
                    </a>
                )
            })}

            <Fade bottom>
                <div className='proj'>
                    <img className='proj-img' src={newPort} alt='prep' />
                    <div>
                        <h1>Portfolio Website v5</h1>
                        <p>My newest portfolio website, used to host my projects and information about myself.
                        Built using ReactJS, react-parallax-tilt, react-router-dom, and react-reveal
              </p>
                        <div>
                            <a href='https://github.com/Hi-Van/hi-van.github.io' target='_blank' rel='noopener noreferrer'><button className='proj-link' title='visit documentation'><FaBookOpen /></button></a>
                            <a href='https://github.com/Hi-Van/hi-van.github.io' target='_blank' rel='noopener noreferrer'><button className='proj-link' title='visit documentation'><FaLink /></button></a>
                        </div>
                    </div>
                </div>
            </Fade>
        </div>
    );
}

export default Projects;