import React, { Component } from 'react';
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

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            const url = 'http://localhost:8080/api/auth/post';
            axios.post(url, data).then((res) => {
                if (res.data.message === "Logged in successfully") {
                    localStorage.setItem('token', res.data);
                    window.location = ('/dashboard');
                } else if (res.data.message === "Invalid Password") {
                    alert(res.data.message)
                } else if (res.data.message === "Invalid Email") {
                    alert(res.data.message)
                } else {
                    alert(res.data.message)
                }
            }).catch((error) => {
                console.log(error);
            });

        } catch (error) {

        }

    }

    return (
        <div className={login.login_container}>
            <div className={login.loginform_container}>
                <div className={login.left}>
                    <form className={login.form_container} onSubmit={handleSubmit}>
                        <h1>Log In</h1>
                        <input
                            type='email'
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