import React from 'react';
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'
function Navbar() {
    return (
        <>
            <nav className="navbar">
                <div className="navbar-title">
                    <h1>IvanTech Shop</h1>
                </div>
                <div className="navbar-links">
                    <Link to="/">Shop</Link>
                    <Link to="/purchased-items">Purchases</Link>
                    <Link to="/checkout"><FontAwesomeIcon icon={faShoppingCart}/></Link>
                    {/*<Link to="/">Shop</Link>*/}
                </div>
            </nav>
        </>
    );
}

export default Navbar;