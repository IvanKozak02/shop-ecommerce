import React, {useState} from 'react';
import logo from '../assets/images/logo.png'
import '../App.css'
import {Link} from "react-router-dom";
import {RiCloseLine, RiMenu3Line} from "react-icons/ri";

function Navbar() {
    const [toggleMenu, setToggleMenu] = useState(false);
    const Menu = () => {
        return (
            <ul className="menu">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/menu">Menu</Link></li>
                <li><Link to="/about">About us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
        )
    }
    return (
        <div className="navbar">
            <div className="left-side">
                <img className="logo" src={logo} alt=""/>
            </div>
            <div className="right-side">
                <Menu/>
                <div className="small-navbar-menu">
                    {toggleMenu ?
                        <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)}/> :
                        <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)}/>
                    }
                    {
                        toggleMenu && (
                            <div className="small-navbar-menu-container">
                                <div className="small-navbar-menu-content">
                                    <Menu/>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Navbar;