import React from 'react';
import {Link} from "react-router-dom";
import pizza from '../assets/images/pizza.jpeg'
import '../App.css'
function Home(props) {
    return (
        <div className="home">
            <div className="header-container" style={{backgroundImage:`url(${pizza})`}}>
                <h1>Ivano`s pizza</h1>
                <p>THE BEST PIZZA OVER THE WORLD</p>
                <Link to="/menu">
                    <button>ORDER NOW</button>
                </Link>
            </div>
        </div>
    );
}

export default Home;