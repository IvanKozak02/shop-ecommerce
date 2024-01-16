import {Link, Navigate} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import {RiCloseLine, RiMenu3Line} from "react-icons/ri";

import './navbar.css'
import {useContext, useState} from 'react'
import {IShopContext, ShopContext} from "../../context/shop-context";
import {useCookies} from "react-cookie";

function Navbar() {
    const {setIsAuthenticated, isAuthenticated} = useContext<IShopContext>(ShopContext);
    const [toggleMenu, setToggleMenu] = useState(false);
    // const {availableMoney} = useContext<IShopContext>(ShopContext);
    const [_, setCookies] = useCookies(['access-token']);
    const {availableMoney} = useContext<IShopContext>(ShopContext);


    const Menu = () => (
        <>
            <Link to="/">Shop</Link>
            <Link to="/purchased-items">Purchases</Link>
            <Link to={'/login'} onClick={logout}>Logout</Link>
            <Link to="/checkout"><FontAwesomeIcon icon={faShoppingCart}/></Link>
        </>
    )

    const logout = () => {
        localStorage.clear()
        setCookies('access-token', null)
        setIsAuthenticated(false)
    }

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="navbar-title">
                        <h1>IvanTech Shop</h1>
                    </div>
                    <div className="navbar-links">
                        {isAuthenticated &&
                            <>
                                <Menu/>
                                <p className="available-money">${availableMoney.toFixed(2)}</p>
                            </>

                        }
                    </div>
                    <div className="small-menu">
                        {toggleMenu ?
                            <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)}/> :
                            <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)}/>
                        }
                        {
                            toggleMenu && isAuthenticated && (
                                <div className="hidden-menu">
                                    <div className="hidden-menu-container">
                                        <Menu/>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;