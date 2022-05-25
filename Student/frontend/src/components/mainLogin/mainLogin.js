import React, { Component,useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import login from './mainlogin.module.css';
import axios from 'axios';
import { useState } from 'react';
import { Button, Dropdown } from 'react-bootstrap';


function MainLogin() {
    const history = useHistory();


    const [data, setData] = useState({
        email: "",
        password: ""
    })

    //student
    const [studentid, setStudentid] = useState("");



    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();


// Login if a user is Staff
        var itnumber = (data.email).substring(0, 2);
        if (itnumber == 'ST') {

            try {
                const url = 'http://localhost:8080/api/staffRegister/login';
                axios.post(url, data).then((res) => {
                  
                    if (res.status == "200") {
                        sessionStorage.setItem('LogUserId',res.data.data.stfStaffId);
                        sessionStorage.setItem('LogUserName',res.data.data.stfName);
                        const logType = 'st'
                        sessionStorage.setItem('LogUserType',logType);
                         window.location = ('/Staffdashboard');
                    
                    } else {
                        alert(res.data.message)
                    }
                }).catch((error) => {
                    console.log(error);
                });
    
            } catch (error) {
    
            }

        }

        try {
            const url = 'http://localhost:8080/api/auth/post';
            axios.post(url, data).then((res) => {

                if (res.data.message === "Logged in successfully") {

                    window.location = ('/dashboard');
                } else if (res.data.message === "Invalid Password") {
                    alert(res.data.message)
                } else if (res.data.message === "Invalid Email") {
                    alert(res.data.message)
                } else {
                    alert(res.data.message)
                }
                localStorage.setItem("id", res.data.student._id);
                localStorage.setItem("studentName", res.data.student.studentName);
                localStorage.setItem("studentId", res.data.student.studentId);
                localStorage.setItem("email", res.data.student.email);
                localStorage.setItem("gender", res.data.student.gender);

            }).catch((error) => {
                console.log(error);
            });

        } catch (error) {

        }

    }


    console.log("ID" + studentid)

    
    useEffect(() => {

        sessionStorage.setItem('LogUserId',"null");
        sessionStorage.setItem('LogUserName',"null");
        
        sessionStorage.setItem('LogUserType',"null");


    });



    return (
        <div className={login.login_container}>
            <div className={login.loginform_container}>
                <div className={login.left}>
                    <form className={login.form_container} onSubmit={handleSubmit}>
                        <h1>Log In</h1>
                        <input
                            type='text'
                            placeholder='Student Email'
                            name='email'
                            value={data.email}
                            onChange={handleChange}
                            required
                            className={login.input}
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            name='password'
                            value={data.password}
                            onChange={handleChange}
                            required
                            className={login.input}
                        />
                        <button type='submit' className={login.greenBtn}>Sign Up</button>
                    </form>
                </div>
                <div className={login.right}>
                    <h1>New Here ?</h1>
                    <Link to='/login'>

                    </Link>




                    <Dropdown>
                        <Dropdown.Toggle variant="adds">
                            <button type='button' className={login.whiteButton} >
                                Sign up
                            </button>
                        </Dropdown.Toggle>

                        <Dropdown.Menu >
                            <Dropdown.Item href="/login">STUDENT</Dropdown.Item>
                            <Dropdown.Item href="/loginRegister">STAFF</Dropdown.Item>

                        </Dropdown.Menu>
                    </Dropdown>
                </div>



            </div>

        </div >

    )
}

export default MainLogin;