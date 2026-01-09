# old user css 

Remove horizontal scrolling everywhere
html, body {
  width: 100%;
  overflow-x: hidden !important;
}

/* Prevent child elements from breaking layout */
* {
  max-width: 100%;
  box-sizing: border-box;
}


/* RESET */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* PAGE WRAPPER */
.userbody {
    width: 100%;
    min-height: 100vh;
    padding: 2rem 1rem;
}

/* TITLE */
.userbody > h1 {
    font-weight: 700;
    color: rgb(0, 0, 255);
    font-size: 1.8rem;
    text-align: center;
    margin-bottom: 2rem;
    text-shadow: 0px 0px 8px rgba(255, 255, 255, 0.8);
}

/* MAIN LAYOUT */
#userlogcontain {
    width: 95%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 1.5rem;
    min-height: 60vh;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    flex-wrap: wrap;
}

/* LEFT SIDE FORM */
#userform {
    background-color: #f5f5f5;
    width: 100%;
    max-width: 420px;
    padding: 2rem 1.5rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
}

#userform h1 {
    font-size: 1.7rem;
    font-weight: 700;
    text-align: center;
}

/* LABEL */
.userfrmlabel {
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 1px;
}

/* INPUTS */
.userfrminput {
    width: 100%;
    padding: 0.7rem 0.8rem;
    border-radius: 8px;
    border: 1px solid #333;
    font-size: 1rem;
}

/* SUBMIT BUTTON */
#usersub {
    background-color: rgb(102, 102, 255);
    color: white;
    font-weight: bold;
    border: none;
    font-size: 1.1rem;

    padding: 0.7rem 1rem;
    border-radius: 8px;
    margin-top: 1rem;
    width: 140px;
    cursor: pointer;
    transition: 0.2s ease;
}

#usersub:hover {
    opacity: 0.9;
}

/* RIGHT SIDE IMAGE */
#frmImg {
    flex: 1;
    min-width: 250px;
}

#frmImg img {
    width: 100%;
    max-width: 450px;
    object-fit: contain;
}

/* ============================= */
/* RESPONSIVE BREAKPOINTS */
/* ============================= */

/* Tablets & small laptops */
@media (max-width: 992px) {
    #userlogcontain {
        flex-direction: column-reverse;
        text-align: center;
    }

    #frmImg img {
        max-width: 300px;
        margin: 0 auto;
    }
}

/* Mobile phones */
@media (max-width: 600px) {
    .userbody > h1 {
        font-size: 1.4rem;
        text-align: center;
        padding: 0 15px;
    }

    #userform {
        padding: 1.5rem 1rem;
    }

    .userfrmlabel {
        font-size: 0.95rem;
    }

    .userfrminput {
        font-size: 0.95rem;
        padding: 0.55rem 0.7rem;
    }

    #usersub {
        width: 100%;
    }
}


# create user jsx 


import axios from 'axios';
import React, { useState } from 'react'
import "../css/user.css"
import logo1 from "../assets/green-user2.png"

import { ToastContainer, toast } from 'react-toastify';


const CreateUser = () => {
    const [userdata, setuserdata] = useState({});

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setuserdata(values => ({ ...values, [name]: value }));
        console.log(userdata);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let api = `${import.meta.env.VITE_BACK_URL}/admin/usercreate`;
            const response = await axios.post(api, userdata);
            toast.success(response.data); 
            setuserdata({}); 

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className='userbody'>

                <h1>Empower your team by giving them access to their workspace.</h1>

                <section id="userlogcontain">
                    
                    <form id='userform' >
                        <h1> Create New User</h1>

                        <label className='userfrmlabel' htmlFor=""> Employee Name</label>
                        <input
                            className='userfrminput' placeholder='Enter employee name' type="text" name='empname' onChange={handleInput} />

                        <label className='userfrmlabel' htmlFor="">Employee Mail</label>
                        <input
                            className='userfrminput' placeholder='Enter employee email' type="text" name='empmail' onChange={handleInput} />

                        <label className='userfrmlabel' htmlFor="" >Select Designation </label>

                        <select className='userfrminput'
                            name='designation' onChange={handleInput} >
                            <option aria-disabled > select designation </option>
                            <option value="Programmer">Programmer</option>
                            <option value="Tester">Tester</option>
                            <option value="Designer">Designer</option>
                            <option value="Analyst">Analyst</option>
                            <option value="DB Designer">DB Designer</option>
                        </select>
                        <button id='usersub' className=' ' type='submit' onClick={handleSubmit}>Submit</button>
                    </form >

                    <div id='frmImg'>
                        <img src={logo1} alt="form" />
                    </div>
                </section>

            </div>
        </>
    )
}

export default CreateUser;  



# admin dash css 

/* ================================= RESET ================================= */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", Arial, sans-serif;
  overflow-x: hidden;
}

/* ================================= MAIN WRAPPER ================================= */
.admindashboard {
  width: 100%;
  min-height: 100vh;
  background: #e6ebff;
  display: flex;
  flex-direction: column;
}

/* ================================= HEADER ================================= */
#adminheader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 2.5vw;
}

/* Title */
#admin {
  font-size: 1.7rem;
  font-weight: 800;
  color: #4a4aff;
}

#admin span {
  color: #000;
}

/* ================================= WELCOME SECTION ================================= */
.welcome {
  color: black !important;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  font-size: 1rem;
}

.logout {
  background: #f8e294;
  border: none;
  padding: 7px 15px;
  border-radius: 5px;
  color: blue;
  cursor: pointer;
  font-weight: bold;
  border: 2px solid black;
}

/* ================================= HAMBURGER ================================= */
#hamburger {
  display: none;
  font-size: 32px;
  padding: 6px 10px;
  background: #fff;
  border-radius: 5px;
  cursor: pointer;
}

/* ================================= ADMIN CONTAINER ================================= */

.admincontainer {
  display: flex;

  /* ⭐ Your requested properties */
  margin: 2vh auto;
  /* NOW WORKS */
  border-radius: 20px;
  /* NOW WORKS */

  /* ⭐ Required for border-radius to *show* */
  background: #dce6ff;
  /* Light neutral background */
  overflow: hidden;
  /* Prevent children from leaking outside */

  width: 95%;
  min-height: 85vh;
}

/* ================================= MENU ================================= */
#adminmenu {
  width: 240px;
  background: #7d7dff;
  padding: 20px 15px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  flex-shrink: 0; 

  /* ⭐ Round left corners to match container */
  border-radius: 20px 0 0 20px;

  transition: left 0.3s ease;
}

#adminmenu a {
  text-decoration: none;
  padding: 12px;
  background: #cadeff;
  text-align: center;
  border-radius: 8px;
  font-weight: 600;
  color: #000;
}

/* ================================= CLOSE BUTTON (MOBILE) ================================= */
#closemenu {
  display: none;
  font-size: 28px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 20px;
}

/* ================================= DATA PANEL ================================= */
#admindata {
  flex: 1;
  padding: 20px;

  /* ⭐ Round right corners */
  border-radius: 0 20px 20px 0;

  background: linear-gradient(to bottom, #7d7dff, #afddff, lightblue);
  min-height: 100%;
}

/* ================================= RESPONSIVE ================================= */
@media (max-width: 1000px) {

  #hamburger {
    display: block;
  }

  /* Header becomes column */
  #adminheader {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .welcome {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  /* Mobile drawer menu */
  #adminmenu {
    position: fixed;
    top: 0;
    left: -240px;
    height: 100vh;
    width: 240px;
    padding-top: 80px;
    z-index: 2000;

    /* Remove border-radius in mobile (looks cleaner) */
    border-radius: 0;
  }

  #adminmenu.showmenu {
    left: 0;
    width: 260px;
    height: 100%;
  }

  #adminmenu.showmenu #closemenu {
    display: block;
  }

  .admincontainer {
    flex-direction: column;

    /* preserve your radius in mobile */
    border-radius: 20px;
  }

  #admindata {
    border-radius: 0 0 20px 20px;
  }
} 

# admin dash board jsx 

import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../css/admindash.css";

const AdminDashBoard = () => {
  const adminname = localStorage.getItem("adminname");
  const adminemail = localStorage.getItem("adminemail");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="sidebar-logo">
          <span>Task</span>Admin
        </div>

        <nav className="sidebar-menu">
          <NavLink to="/admin-dashboard" end>
            <i className="icon">🏠</i> Dashboard
          </NavLink>

          <NavLink to="create-user">
            <i className="icon">👤</i> Create User
          </NavLink>

          <NavLink to="assign-task">
            <i className="icon">🎯</i> Assign Task
          </NavLink>

          <NavLink to="report">
            <i className="icon">📊</i> Reports
          </NavLink>

          <NavLink to="setting">
            <i className="icon">⚙️</i> Settings
          </NavLink>
        </nav>
      </aside>

      {/* MAIN AREA */}
      <main className="admin-main">
        {/* TOP BAR */}
        <header className="admin-topbar">
          <input
            type="text"
            placeholder="Search..."
            className="topbar-search"
          />

          <div className="topbar-profile">
            <div className="profile-info">
              <span className="name">{adminname}</span>
              <span className="email">{adminemail}</span>
            </div>
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <section className="admin-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default AdminDashBoard; 

# assign task page 

import axios from "axios";
import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import "../css/assigntask.css"
import { toast } from "react-toastify";

const AssignTask = () => {
  const [mydata, setMydata] = useState([]);  // to get data of employe to assign task
  const [show, setShow] = useState(false);
  const [input, setInput] = useState({});
  const [uid, setUid] = useState("");

  const handleClose = () => setShow(false);

  const handleShow = (id) => {
    setUid(id);
    setShow(true);
  }

  // 
  const loadData = async () => {
    try {
      let api = `${import.meta.env.VITE_BACK_URL}/admin/empdisplay`;
      const response = await axios.get(api);
      console.log(response.data);
      setMydata(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadData();
  }, [])

  // 
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput(values => ({ ...values, [name]: value }));
    console.log(input);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let api = `${import.meta.env.VITE_BACK_URL}/admin/tasksave`;
      const response = await axios.post(api, { id: uid, ...input });
      toast.success(response.data.msg);
      setShow(false); 
    }
    catch (error) {
      console.log(error);
    }
  }

  // getting each employee data also emp ID  
  let sno = 0;
  const ans = mydata.map((key) => {
    sno++;
    return (
      <>
        <tr>
          <td> {sno} </td>
          <td> {key.name} </td>
          <td> {key.designation} </td>
          <td> {key.email} </td>
          <td>
            <Button variant="success" onClick={() => { handleShow(key._id) }}>Assign Task</Button>
          </td>
        </tr>
      </>
    )
  })


  return (
    <>
      <h1> Assign Task</h1>

      <div className="table-responsive-wrapper">
        <Table className="table-custom" striped bordered hover> 
          <thead>
            <tr>
              <th>sno</th>
              <th>Employee Name</th>
              <th>Designation</th>
              <th>Email</th>
              <th> Assign Button</th>
            </tr>
          </thead>
          <tbody>
            {ans}
          </tbody>
        </Table>
      </div>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Assign New Task</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form >

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter Task</Form.Label>
              <Form.Control type="text" name="task" onChange={handleInput} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Enter Duration Days </Form.Label>
              <Form.Control type="text" name="duration" onChange={handleInput} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Select Priority </Form.Label>
              <Form.Select aria-label="Default select example" name="priority" onChange={handleInput}>
                <option>select priority</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>

          </Form>
        </Modal.Body>

      </Modal>

    </>
  )
}

export default AssignTask;

# assign task css 
/* ===================== PAGE WRAPPER (FULL HEIGHT) ===================== */
.page-container {
    width: 100%;
    min-height: calc(100vh - 80px);
    padding: 20px 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

/* Page Title */
.page-container h1 {
    text-align: center;
    margin-bottom: 10px;
    font-size: 2rem;
    font-weight: 700;
    color: #333;
}



/*    this is report jsx table css  */

/* ===================== TABLE RESPONSIVE WRAPPER ===================== */
.table-responsive-wrapper {
    width: 100%;
    flex: 1;
    background: #ffffff;
    border-radius: 16px;
    padding: 15px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.15);

    overflow-y: auto;
    overflow-x: auto;    /* IMPORTANT: enables left-right scroll */
    white-space: nowrap; /* Prevents column squishing */
}

/* Scrollbar style */
.table-responsive-wrapper::-webkit-scrollbar {
    height: 6px;
    width: 6px;
}
.table-responsive-wrapper::-webkit-scrollbar-thumb {
    background: #999;
    border-radius: 10px;
}

/* ===================== TABLE STYLE ===================== */
.table-custom {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    min-width: 900px; /* ensures scrolling on small screens */
}

.table-custom td:last-child,
.table-custom th:last-child {
    min-width: 140px;   /* or 150px if needed */
    white-space: nowrap;
}

/* Header */
.table-custom thead th {
    background-color: #7b2ff7;
    color: white;
    padding: 14px;
    font-size: 1rem;
    position: sticky;
    top: 0;
    z-index: 5;
}

/* Body */
.table-custom tbody tr {
    background: #f6faff;
}

.table-custom td {
    padding: 14px;
    font-size: 0.95rem;
    border-bottom: 1px solid #ddd;
}

/* Hover */
.table-custom tbody tr:hover {
    background: #e9f6ff;
    transition: 0.2s;
}

/* ===================== RESPONSIVE ===================== */
@media (max-width: 1024px) {
    .page-container {
        padding: 15px;
    }
    .table-responsive-wrapper {
        padding: 10px;
    }
}

@media (max-width: 768px) {
    .page-container h1 {
        font-size: 1.6rem;
    }
    /* force scroll */
    .table-custom {
        min-width: 800px;
    }
}

@media (max-width: 576px) {
    .page-container {
        padding: 10px;
    }
    .table-responsive-wrapper {
        padding: 8px;
    }
    .table-custom {
        min-width: 700px;
    }
}


# report jsx 
import { useEffect, useState } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import "../css/assigntask.css"

const Report = () => {
    const [mydata, setmydata] = useState([]);

    const loadData = async () => {
        try {
            let api = `${import.meta.env.VITE_BACK_URL}/admin/taskreportdisplay`;
            const response = await axios.get(api);
            console.log(response.data);
            setmydata(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadData();
    }, [])

    const taskReassign = async (tid) => {
        try {
            let api = `${import.meta.env.VITE_BACK_URL}/admin/taskreassign/?id=${tid}`;
            const response = await axios.get(api);
            alert(response.data.msg);
        } catch (error) {
            console.log(error);
        }
        loadData(); 
    }


    let sno = 0;
    const ans = mydata.map((key) => {
        sno++;
        return (
            <>
                <tr>
                    <td> {sno} </td>
                    <td>{key.task}</td>
                    <td>{key.duration}</td>
                    <td>{key.priority}</td>
                    <td>{key.completionday}</td>
                    <td> {key.empid.name} </td>
                    <td> {key.empid.email} </td>
                    <td> {key.empid.designation} </td>
                    <td>{key.taskstatus}</td>
                    <td>
                        <Button variant="danger" onClick={() => { taskReassign(key._id) }}> Re-Assign</Button>
                    </td>
                </tr>
            </>
        )
        // }
    })



    return (
        <>
             <div >

                <h1 > Report of employee tasks </h1>

                <div className="table-responsive-wrapper">
                    <Table className="table-custom" striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Task Name</th>
                                <th>Duration </th>
                                <th>Priority Level</th>
                                <th>Time taken </th>
                                <th> Emp Name</th>
                                <th> Emp Email</th>
                                <th> Emp Designation</th>
                                <th> task status</th>
                                <th> Re-Assign Task?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ans}
                        </tbody>
                    </Table>
                </div>



            </div>
        </>
    )
}

export default Report; 



# setting jsx 
import React, { useState } from 'react';
import axios from 'axios';
import "../css/employee.css"
import key from "../assets/key.svg"
import logo1 from "../assets/passadmin.png"

import { ToastContainer, toast } from 'react-toastify';

//  Admin password change

const Setting = () => {
    const [oldpass, setoldpass] = useState("")
    const [newpass, setnewpass] = useState("")
    const [confirmpass, setconfirmpass] = useState("")

    const adminPass = localStorage.getItem("adminPass");
    const adminId = localStorage.getItem("adminId");



    let handleSubmit = async (e) => {

        e.preventDefault();
        try {
            if (oldpass === adminPass && newpass === confirmpass) {

                let api = `${import.meta.env.VITE_BACK_URL}/admin/changepass`;
                const response = await axios.post(api, { adminId, newpass, confirmpass });
                toast.success(response.data.msg)
                console.log(response.data.mypass)

            }
            else {
                toast.warning("Either wrong password or missmatch !!");
            }

        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div id='adminsetting'>
                <h1>Admin can Change his Password here.</h1>

                <article id='passadmin'>
                    
                    <img src={logo1} alt="" />

                    <form class='passform'>
                        <img id='passkey' src={key} alt="key" />

                        <label className='passlabel' htmlFor=""> Old Password</label>
                        <input
                            className='passinput' placeholder='Enter old password' type="text" name='oldpass' onChange={(e) => setoldpass(e.target.value)}
                        />

                        <label className='passlabel' htmlFor=""> Enter New Password</label>
                        <input
                            className='passinput' placeholder='Enter password' type="text" name='newpass' onChange={(e) => setnewpass(e.target.value)}
                        />

                        <label className='passlabel' htmlFor=""> Confirm New Password</label>
                        <input
                            className='passinput' placeholder='Confirm password' type="text" name='confirmpass' onChange={(e) => setconfirmpass(e.target.value)}
                        />

                        <button class='subpass' className='' type='submit' onClick={handleSubmit}>Submit</button>
                    </form>
                </article>

            </div>
        </>
    )
}

export default Setting; 
