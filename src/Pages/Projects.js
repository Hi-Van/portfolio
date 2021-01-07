import './Projects.css'
import { React, useState } from 'react';
import Fuse from 'fuse.js';
import proj from '../Data/projects.json';

const Project = () => {
    const [query, setQuery] = useState('');
    const [search, setSearch] = useState('');

    const handleSubmit = (e) => {
        e.preventDefualt();
        setQuery(search);
    }

    const fuse = new Fuse(proj, {
        keys: [
            'title',
            'type'
        ],
        threshold: '0.35'
    })

    const results = fuse.search(query);

    const linkResult = query ? results.map(result => result.item) : proj;

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Search Projects.." value={search} onChange={e => setSearch(e.target.value)} className='search' />
                <input type="submit" value="Search" className='search-btn' />
            </form>
        </div>
    );
};

export default Project;