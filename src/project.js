import './project.css';
import { useState } from 'react';
import { FaLink, FaBookOpen, FaAngleUp } from "react-icons/fa";
import { Link as Scroll } from 'react-scroll';
import Fade from 'react-reveal/Fade';
import Fuse from 'fuse.js';
import links from './projects.json';

function Projects() {

    const [query, setQuery] = useState('');
    const [test, setTest] = useState('');

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setQuery(test);
        console.log("this is the previous query: " + query, "this is the current query: " + test);
    }

    const am4Charts = () => { setQuery('am4Charts'); console.log('1'); }
    const HTML = () => { setQuery('HTML'); console.log('2'); }
    const CSS = () => { setQuery('CSS'); console.log('3'); }
    const JavaScript = () => { setQuery('JavaScript'); console.log('4'); }
    const MaterialUI = () => { setQuery('MaterialUI'); console.log('5'); }
    const Figma = () => { setQuery('Figma'); console.log('6'); }
    const FuseJS = () => { setQuery('FuseJS'); console.log('7'); }
    const ReactJS = () => { setQuery('ReactJS'); console.log('8'); }
    const Heroku = () => { setQuery('Heroku'); console.log('9'); }
    const NextJS = () => { setQuery('NextJS'); console.log('10'); }
    const ChartJS = () => { setQuery('ChartJS'); console.log('11'); }
    const Google = () => { setQuery('Google'); console.log('12'); }
    const Reset = () => { setQuery(''); console.log('reset') }

    const fuse = new Fuse(links, {
        keys: [
            'title',
            'tech',
            'desc'
        ],
        threshold: 0.25,
    })

    const results = fuse.search(query);

    const linkResult = query ? results.map(result => result.item) : links;

    return (
        <div className='projects'>
            <div className='space' id='projects' />
            <Fade bottom><h1 style={{ marginBottom: '8rem', textAlign: 'center', fontWeight: '400' }}>PROJECTS <span>💻</span></h1></Fade>


            <Fade bottom>
                <p style={{ textAlign: 'center', fontWeight: '400', margin: '-4rem 0rem 1rem 0rem' }}>Search Projects <span className='wave'>🔍</span>... </p>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Look For Projects.." value={test} onChange={e => setTest(e.target.value)} className='search' />
                    <input type="submit" value="Search" className='btn-input' />
                </form>
                <p style={{ textAlign: 'center', fontWeight: '400', margin: '4rem 1rem 0rem 1rem' }}>or just use these tags <span className='point'>👇</span></p>
                <div className="grid-search">
                    <button className="search-btn am4Charts" onClick={am4Charts}>am4Charts</button>
                    <button className="search-btn HTML" onClick={HTML}>HTML</button>
                    <button className="search-btn CSS" onClick={CSS}>CSS</button>
                    <button className="search-btn JavaScript" onClick={JavaScript}>JavaScript</button>
                    <button className="search-btn MaterialUI" onClick={MaterialUI}>MaterialUI</button>
                    <button className="search-btn Figma" onClick={Figma}>Figma</button>
                    <button className="search-btn FuseJS" onClick={FuseJS}>FuseJS</button>
                    <button className="search-btn ReactJS" onClick={ReactJS}>ReactJS</button>
                    <button className="search-btn Heroku" onClick={Heroku}>Heroku</button>
                    <button className="search-btn NextJS" onClick={NextJS}>NextJS</button>
                    <button className="search-btn ChartJS" onClick={ChartJS}>ChartJS</button>
                    <button className="search-btn Google" onClick={Google}>Google</button>
                    <button className="search-btn" onClick={Reset}>Reset</button>
                </div>
            </Fade>

            {linkResult.map(card => {
                const { title, tech, desc, code, link, img } = card;

                return (
                    <Fade bottom>
                        <div className='proj'>
                            <img className='proj-img' src={img} alt='prep' />
                            <div className='proj-card'>
                                <h1>{title}</h1>
                                <div className="grid-search" style={{ margin: '12px 0px 0px 0px' }}>
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
                                                justifyContent: 'center',
                                                whiteSpace: 'nowrap',
                                            }}>{i}</button>
                                        )
                                    })}
                                </div>
                                <p style={{ margin: '1rem 0rem 0rem 0rem', textAlign: 'left' }}>{desc}</p>
                                <div>
                                    <a href={code} target='_blank' rel='noopener noreferrer'><button className='proj-link' title='visit documentation'><FaBookOpen /></button></a>
                                    <a href={link} target='_blank' rel='noopener noreferrer'><button className='proj-link' title='visit documentation'><FaLink /></button></a>
                                </div>
                            </div>
                        </div>
                    </Fade>
                )
            })}

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Scroll style={{ cursor: 'context-menu' }} to='projects' smooth={true} duration={600}><button className='btn-link'> Back To Top &nbsp;&nbsp; <FaAngleUp /> </button></Scroll>
            </div>
        </div>
    );
}

export default Projects;