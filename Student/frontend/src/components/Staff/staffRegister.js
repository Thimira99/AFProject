import React, { Component } from 'react';
import { Link, useHistory } from 'react-router-dom'
import loginStyles from './staff.module.css'
import axios from 'axios';
import { useState } from 'react';

function staffRegister() {

    const [data, setData] = useState({
        studentName: "",
        studentId: "",
        email: "",
        gender: "",
        password: ""
    })

    const [reserchFields , setreserchfields ] = useState({});

    setreserchfields("Artificial Intelligence",
        "Computational & Synthetic Biology",
        "Computer Architecture",
        "Computer Graphics, Vision, Animation, and Game Science",
        "Computing for Development",
        "Data Science",
        "Data Management and Visualization",
       " Human Computer Interaction",
        "Machine Learning",
        "Molecular Information Systems",
        "Natural Language Processing",
        "Programming Languages and Software Engineering",
       " Robotics",
        "Security and Privacy",
       " Systems and Networking",
        "Theory of Computation",
        "Ubiquitous Computing",
       " Wireless and Sensor Systems",
        "Cloud Computing")

    const history = useHistory();
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            const url = 'http://localhost:8080/api/student';
            axios.post(url, data).then((res) => {
                if (res.data.message === "Student Created") {
                    alert(res.data.message);
                    history.push('/mainLogin');
                } else {
                    alert(res.data.message);
                }
            }).catch((err) => {
                console.log(err)
            });

            console.log(res.message);
        } catch (error) {

        }

    }

    return (
        <div className={loginStyles.signup_container}>
            <div className={loginStyles.signupform_container}>
                <div className={loginStyles.left}>
                    <h1>Welcome Back</h1>
                    <Link to='/mainlogin'>
                        <button type='button' className={loginStyles.whiteButton}>
                            Sign in
                        </button>
                    </Link>
                </div>
                <div className={loginStyles.right} style={{ 'height': '500px', 'overflow': 'auto', 'display': 'block' }}>

                    <form className={loginStyles.form_container} onSubmit={handleSubmit}>
                        <h1>Staff Registration</h1>
                        <input
                            type='text'
                            placeholder='Student Name'
                            name='Name'
                            value={data.studentName}
                            onChange={handleChange}
                            required
                            className={loginStyles.input}
                        />
                        <input
                            type='email'
                            placeholder='Email'
                            name='Email'
                            value={data.studentId}
                            onChange={handleChange}
                            required
                            className={loginStyles.input}
                        />
                        <input
                            type='text'
                            placeholder='Phone Number'
                            name='Phone Number'
                            value={data.email}
                            onChange={handleChange}
                            required
                            className={loginStyles.input}
                        />
                        <select id="jobRole" name="Job Role" className={loginStyles.input}>
                            <option value="Superviosr">Superviosr </option>
                            <option value="Co-Superviosr">Co-Superviosr</option>
                            
                        </select>
                       
                        <input
                            type='password'
                            placeholder='Password'
                            name='password'
                            value={data.password}
                            onChange={handleChange}
                            required
                            className={loginStyles.input}
                        />

                        {/* //........ */}

                        <input
                            type='text'
                            placeholder='Student Gender'
                            name='gender'
                            value={data.gender}
                            onChange={handleChange}
                            required
                            className={loginStyles.input}
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            name='password'
                            value={data.password}
                            onChange={handleChange}
                            required
                            className={loginStyles.input}
                        />
                        <input
                            type='text'
                            placeholder='Student Gender'
                            name='gender'
                            value={data.gender}
                            onChange={handleChange}
                            required
                            className={loginStyles.input}
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            name='password'
                            value={data.password}
                            onChange={handleChange}
                            required
                            className={loginStyles.input}
                        />
                        <button type='submit' className={loginStyles.greenBtn}>Sign Up</button>
                    </form>
                </div>

            </div>

        </div>

    )
}

export default staffRegister;