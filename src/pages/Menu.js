import React from 'react';
import MenuItem from "../components/MenuItem";
import '../App.css'
import {menuList} from "../data/MenuList";

function Menu() {
    return (
        <div className="menu">
            <h1 className="menu-title">Our menu</h1>
            <div className="menu-cards">
                {menuList.map((item)=>(
                    <MenuItem item={item}/>
                ))}
            </div>
        </div>
    );
}

export default Menu;