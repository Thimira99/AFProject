import React, { Component } from 'react';

import admin from '../images/admin.jpg';

function Header() {
    return (
        <div className='header'>
            <img src={admin} />
            <button className="header-logout-button">Logout</button>
        </div>

    )
}

export default Header;