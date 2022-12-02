import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { Link } from 'react-scroll'

const Navbar = () => {
    const [show, handleShow] = useState(false)
    const transitionNavBar = () => {
        if (window.scrollY > 100) {
            handleShow(true)
        } else {
            handleShow(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', transitionNavBar)

        return () => window.removeEventListener('scroll', transitionNavBar)
    }, [])

    return (
        <div className={`navbar ${show && 'navbar__dark'}`}>
            <div className="navbar__elements">
                <Link 
                    className="navbar__links"
                    to='homeId'
                    smooth={true}
                    duration={1000}
                    spy={true}
                    exact='true'
                    offset={-45}
                >
                    <p>Home</p>
                </Link>
                <Link 
                    className="navbar__links"
                    to='aboutId'
                    smooth={true}
                    duration={1000}
                    spy={true}
                    exact='true'
                    offset={-45}
                >
                    <p>About</p>
                </Link>
                <Link 
                    className="navbar__links"
                    to='resumeId'
                    smooth={true}
                    duration={1000}
                    spy={true}
                    exact='true'
                    offset={-45}
                >
                    <p>Resume</p>
                </Link>
                <Link 
                    className="navbar__links"
                    to='projectsId'
                    smooth={true}
                    duration={1000}
                    spy={true}
                    exact='true'
                    offset={-45}
                >
                    <p>Projects</p>
                </Link>
                <Link 
                    className="navbar__links"
                    to='contactId'
                    smooth={true}
                    duration={1000}
                    spy={true}
                    exact='true'
                    offset={-45}
                >
                    <p>Contact</p>
                </Link>
            </div>
        </div>
    )
}

export default Navbar
