import React from 'react'
import { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/form.css"

import logo from "../assets/loginLogo.png"
import logo1 from "../assets/tasklogo.png"

import { ToastContainer, toast } from 'react-toastify';

const Form = () => {

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [usertype, setusertype] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Env value:", import.meta.env.VITE_BACK_URL);

        if (usertype === "admin") {
            //  admin login 
            try {
                let api = `${import.meta.env.VITE_BACK_URL}/admin/login`;
                const response = await axios.post(api, { email, password });

                localStorage.setItem("adminname", response.data.Admin.name);
                localStorage.setItem("adminemail", response.data.Admin.email);
                localStorage.setItem("adminPass", response.data.Admin.password);
                localStorage.setItem("adminId", response.data.Admin._id);

                toast.success(response.data.msg);
                navigate("/admin-dashboard");
            }
            catch (error) {
                toast.warning(error.response.data.msg);
            }
        }
        else {
            // employee login 
            try {
                let api = `${import.meta.env.VITE_BACK_URL}/employee/login`;
                const response = await axios.post(api, { email, password });

                localStorage.setItem("empname", response.data.employee.name);
                localStorage.setItem("empemail", response.data.employee.email);
                localStorage.setItem("empdesignation", response.data.employee.designation);
                localStorage.setItem("empid", response.data.employee._id);
                localStorage.setItem("empPass", response.data.employee.password);

                // jwt token set
                localStorage.setItem("emptoken", response.data.token);
                console.log(response.data);

                toast.success(`Welcome ${response.data.employee.name}`);  // welcome msg

                navigate("/emp-dashboard");
            }
            catch (error) {
                toast.warning(error.response.data.msg);
            }
        }
    }

    // const Auth = async () => {
    //     if (!mytoken) return;

    //     let api = `${import.meta.env.VITE_BACK_URL}/employee/auth`;

    //     const response = await axios.get(api, {
    //         headers: { "auth-token": mytoken }
    //     });
    //     alert(response.data.msg);
    //     console.log(response.data.employee);
    //     navigate("/emp-dashboard");
    // }

    // useEffect(() => {
    //     Auth();
    // }, []);

    useEffect(() => {
        const mytoken = localStorage.getItem("emptoken");
        if (mytoken) {
            navigate("/emp-dashboard");
        }
        
    }, []);




    return (
        <>
            <div className='loginbody'>

                <h1 id='loghead'>Task Management App</h1>

                <section id="logcontain">

                    {/* LEFT SIDE IMAGE */}
                    <div className="loginwelcome">
                        <img src={logo1} alt="welcome" />
                        <div>
                            <p>👉 Track your tasks and stay on schedule.</p>
                            <p>👉 Access your dashboard and manage your projects easily.</p>
                            <p>👉 Log in to view and update your assigned tasks.</p>
                        </div>
                    </div>

                    {/* ⭐ WRAPPED FORM + TITLE TOGETHER ⭐ */}
                    <div className="formwrapper">
                        <p id="formtitle">Login to Dashboard</p>

                        <form className='loginform' onSubmit={handleSubmit}>

                            <div id='loginlogo'>
                                <img src={logo} alt="logo" />
                                <span id='tasky'>Tasky</span>
                            </div>

                            <h2 className='welcome'>Welcome Back!</h2>
                            <div>Please enter login details below</div>

                            <label className='loglabel'>Email Address</label>
                            <input
                                className="loginput"
                                placeholder='Enter your email'
                                type="email"
                                onChange={(e) => setemail(e.target.value)}
                            />

                            <label className='loglabel'>Password</label>
                            <input
                                className="loginput"
                                placeholder='Enter your password'
                                type="password"
                                onChange={(e) => setpassword(e.target.value)}
                            />

                            <label className='loglabel'>Select User</label>
                            <select
                                className="loginput"
                                onChange={(e) => setusertype(e.target.value)}
                            >
                                <option >select user</option>
                                <option value="admin">Admin</option>
                                <option value="employee">Employee</option>
                            </select>

                            <button id='btnlog' type='submit'>Login</button>

                        </form>
                    </div>

                </section>

            </div>

        </>
    )
}

export default Form;


