
import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';


import student from '../images/std2.jpg';

function Header() {


    const id = localStorage.getItem('id');

    const [studentName, setStudentName] = useState("");
    const [studentId, setStudentId] = useState("");

    const [logStaffUser, setLogUser] = useState('');
    const [logStatus, setlogStatus] = useState('');
    const [logUseName, setloguserName] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8080/api/student/get/${id}`).then((res) => {
            setStudentName(res.data.studentName);
            setStudentId(res.data.studentId);
        }).catch((error) => {
            console.log(error)
        })

        const logStaff = sessionStorage.getItem('LogUserId')
        setLogUser(logStaff);

        const logStatus = sessionStorage.getItem('LogUserType') == 'st' ? true : false
        setlogStatus(logStatus)

        const logUsername = sessionStorage.getItem('LogUserName')
        setloguserName(logUsername)
    })

    const itnum = localStorage.getItem('studentId');

    console.log(logStatus)

    return (
        <div className='header'>
            <img src={student} />

            {logStatus ? <><h5 style={{ color: 'white', marginLeft: '870px', marginTop: '1.3rem' }}>{logStaffUser}   {logUseName}</h5><button className="header-logout-button">Logout</button></>


                :

                <><h3 style={{ color: 'white', marginLeft: '870px', marginTop: '1rem' }}>{studentName}({studentId})</h3><button className="header-logout-button">Logout</button></>

            }



        </div>

    )
}

export default Header;