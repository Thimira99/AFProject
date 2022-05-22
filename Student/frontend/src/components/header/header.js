import React, { Component, useState, useEffect } from 'react';

import student from '../images/std2.jpg';

function Header() {


    const [logStaffUser, setLogUser] = useState('');
    const [logStatus, setlogStatus] = useState('');
    const [logUseName, setloguserName] = useState('');




    useEffect(() => {



        const logStaff = sessionStorage.getItem('LogUserId')
        setLogUser(logStaff);

        const logStatus = sessionStorage.getItem('LogUserType') == 'st' ? true : false
        setlogStatus(logStatus)

        const logUsername = sessionStorage.getItem('LogUserName')
        setloguserName(logUsername)



    });

    console.log(logStatus)

    return (
        <div className='header'>
            <img src={student} />

            {logStatus ? <><h5 style={{ color: 'white', marginLeft: '870px', marginTop: '1.3rem' }}>{logStaffUser}   {logUseName}</h5><button className="header-logout-button">Logout</button></>
            
            
 :

                <button style={{marginLeft: '1100px'}} className="header-logout-button">Logout</button>

            }


        </div>

    )
}

export default Header;