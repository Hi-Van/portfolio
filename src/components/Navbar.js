import "../themes.css"
import "./Navbar.css"
import { GiHamburgerMenu } from "react-icons/gi"
import { useState } from "react";
import { Link } from "react-scroll"
import Toggle from "./Toggle"
import ResumePDF from "../Resume_Vanouphon_Sirisouk_Privated.pdf"

const NavBar = (props) => {
    const [menuActive, setMenuActive] = useState(false)

    const toggleMenu = () => {
        const mobileMenu = document.getElementById("mobileNav")
        mobileMenu.style.right = !menuActive ? "0vw" : "-85vw"

        setMenuActive(!menuActive)
    }

    window.screen.orientation.onchange = () => {
        const landscape = window.screen.orientation.type === "landscape-primary" || window.screen.orientation.type === "landscape-primary"
        const large = window.screen.width >= 1120

        if (landscape && large && menuActive) {
            toggleMenu()
        }

    }

    return (
        <div>
            <ul className="mobile-nav" id="mobileNav">
                <li><Link
                    to="about"
                    smooth={true}
                    duration={500}
                >about</Link></li>

                <li><Link
                    to="exp"
                    smooth={true}
                    duration={500}
                >experience</Link></li>

                <li><Link
                    to="projects"
                    smooth={true}
                    duration={500}
                >projects</Link></li>
                
                <li><a href="#about" target="_blank" rel="noopener noreferrer" className="resume">resume</a></li>
                <li><Toggle toggleFunction={props.onToggleDrill} darkState={props.darkmode} /></li>
            </ul>

            <button className="hamburger" id="hamburger" onClick={toggleMenu}><GiHamburgerMenu /></button>

            <nav className={"nav-container " + props.colorTheme}>

                <h3>
                    <span style={{ color: "var(--highlight)" }}>Van</span>ouphon <span style={{ color: "var(--highlight)" }}>S</span>irisouk
                    <span style={{ color: "var(--highlight)" }}>.</span>
                </h3>

                <ul className="normal-nav">
                    <li><Toggle toggleFunction={props.onToggleDrill} darkState={props.darkmode} /></li>

                    <li><Link
                        to="about"
                        smooth={true}
                        duration={500}
                    >about</Link></li>

                    <li><Link
                        to="exp"
                        smooth={true}
                        duration={500}
                    >experience</Link></li>

                    <li><Link
                        to="projects"
                        smooth={true}
                        duration={500}
                    >projects</Link></li>

                    <li><a href={ResumePDF} target="_blank" rel="noopener noreferrer" className="resume">resume</a></li>
                </ul>

            </nav>
        </div>
    );
};

export default NavBar