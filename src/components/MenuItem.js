import React from 'react';
function MenuItem({item}) {
    return (
        <div className="menu-card">
            <div className="card-img">
                <img src={item.image} alt=""/>
            </div>
            <div className="card-description">
                <div className="card-description-container">
                    <h2>{item.name}</h2>
                    <p>{item.price}</p>
                </div>
            </div>
        </div>
    );
}

export default MenuItem;