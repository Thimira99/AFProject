import React, { Component } from 'react';
import { Link, useHistory } from 'react-router-dom'
import login from './mainlogin.module.css';
import axios from 'axios';
import { useState } from 'react';


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
                        <button type='button' className={login.whiteButton}>
                            Sign up
                        </button>
                    </Link>

                </div>

            </div>

        </div>

    )
}

export default MainLogin;