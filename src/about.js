import Fade from 'react-reveal/Fade';

function About() {
    return (
        <div className='about'>
            <div className='space' />
            <div className='space' />
            <div className='space' />
            <Fade bottom>
                <h3>Hey I'm Van...</h3>
                <p className='about-txt'>
                    I'm currently a sophomore at the University of Connecticut.
                    I'm the founder of the UConn Stamford Engineer Majors, a group of collaborative students at the UConn Stamford campus.
                    I've recently been a part of an initiative group called Summer of Shipping as a core team member and frontend developer.
                    When I'm not drowning in my coursework, I like to work out and watch YouTube tutorials I'll never do.
                    You can also find me scrolling through Twitter, making commits on GitHub, or networking on LinkedIn.
            </p>
            </Fade>
            <div className='space' />
            <Fade bottom>
                <h3>Some of my favorite songs include...</h3>
            </Fade>
            <div className='grid'>
                <Fade left>
                    <iframe src="https://open.spotify.com/embed/track/37HRd8gZ7F1l1Awm6debTv" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media" title='play song' />
                </Fade>
                <Fade bottom>
                    <iframe src="https://open.spotify.com/embed/track/5dn6QANKbf76pANGjMBida" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media" title='play song' />
                </Fade>
                <Fade right>
                    <iframe src="https://open.spotify.com/embed/track/69KERH8EU5P2VwxWlmOVcU" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media" title='play song' />
                </Fade>
            </div>
        </div>
    );
}

export default About;