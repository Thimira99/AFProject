import React, { Component } from 'react';

import student from '../images/std2.jpg';

function Header() {
    return (
        <div className='header'>
            <img src={student} />
            <button className="header-logout-button">Logout</button>
        </div>

    )
}

export default Header;