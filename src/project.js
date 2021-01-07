import './project.css';
import { useState } from 'react';
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
                <button className="search-btn am4Charts">am4Charts</button>
                <button className="search-btn HTML">HTML</button>
                <button className="search-btn CSS">CSS</button>
                <button className="search-btn JavaScript">JavaScript</button>
                <button className="search-btn MaterialUI">MaterialUI</button>
                <button className="search-btn Figma">Figma</button>
                <button className="search-btn FuseJS">FuseJS</button>
                <button className="search-btn ReactJS">ReactJS</button>
                <button className="search-btn Heroku">Heroku</button>
                <button className="search-btn NextJS">NextJS</button>
                <button className="search-btn ChartJS">ChartJS</button>
                <button className="search-btn Google">Google</button>
            </div>

            {linkResult.map(card => {
                const { title, tech, desc, code, link, img } = card;

                return (
                    <Fade bottom>
                        <div className='proj'>
                            <img className='proj-img' src={img} alt='prep' />
                            <div>
                                <h1>{title}</h1>
                                <div className="grid-search" style={{margin: '12px 0px 0px -16px'}}>
                                    {tech.map(i => {
                                        return (
                                            <button className={i} style={{
                                                fontFamily: "Raleway",
                                                letterSpacing: '0.5px',
                                                fontWeight: '500',
                                                borderRadius: '4px',
                                                fontSize: '1.25rem',
                                                minWidth: '120px',
                                                margin: '1rem 2rem 0rem 2rem',
                                                display: 'flex',
                                                justifyContent: 'center'
                                            }}>{i}</button>
                                        )
                                    })}
                                </div>
                                <p>{desc}</p>
                                <div>
                                    <a href={code} target='_blank' rel='noopener noreferrer'><button className='proj-link' title='visit documentation'><FaBookOpen /></button></a>
                                    <a href={link} target='_blank' rel='noopener noreferrer'><button className='proj-link' title='visit documentation'><FaLink /></button></a>
                                </div>
                            </div>
                        </div>
                    </Fade>
                )
            })}
        </div>
    );
}

export default Projects;