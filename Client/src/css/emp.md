#emp dashboard 
import React from 'react'
import "../empcss/empdash.css"
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import "../css/form.css"

const EmpDashboard = () => {
    let empname = localStorage.getItem("empname");
    let emptask = localStorage.getItem("task");

    let navigate = useNavigate()
    const logout = () => {
        localStorage.clear(); 
        navigate("/")
    }

    return (
        <>
            <div className='empdashboard'>

                <div id="empheader">

                    {/* NEW HAMBURGER BUTTON FOR MOBILE */}
                    <div id="hamburger" onClick={() => {
                        document.getElementById("empmenu").classList.toggle("showmenu");
                    }}>
                        ☰
                    </div>

                    <h1 id='employee'>Employees <span>Dashboard</span>  </h1>
                    <div className='welcome'>
                        Welcome, {empname}
                        <button className='logout' onClick={logout} >Logout</button>
                    </div>
                </div>

                <div className="empcontainer">
                    <div id="empmenu">

                        {/* NEW CLOSE BUTTON FOR MOBILE MENU */}
                        <div id="closemenu" onClick={() => {
                            document.getElementById("empmenu").classList.remove("showmenu");
                        }}>
                            ×
                        </div> 

                        {/* menu bar highlight the current option form css */}

                        <NavLink to="/emp-dashboard"
                            className={({ isActive }) => (isActive ? "empactive-menu" : "")}
                            end >
                            Employee Home
                        </NavLink>


                        <NavLink to="mytask"
                            className={({ isActive }) => (isActive ? "empactive-menu" : "")} >
                            Total Tasks
                        </NavLink> 


                        <NavLink to="submitedtask"
                            className={({ isActive }) => (isActive ? "empactive-menu" : "")} >
                            Submitted Tasks
                        </NavLink> 


                        <NavLink to="remainingTask"
                            className={({ isActive }) => (isActive ? "empactive-menu" : "")} >
                            Remaining Tasks
                        </NavLink> 


                        <NavLink to="settings"
                            className={({ isActive }) => (isActive ? "empactive-menu" : "")} >
                            Settings
                        </NavLink> 

                    </div>

                    <div id="empdata">
                        <Outlet />
                    </div>

                </div>

            </div>
        </>
    )
}

export default EmpDashboard 


# emp home jsx 

import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import "../css/employee.css"

const EmpHome = () => {
    const [mydata, setmydata] = useState([]);

    const loadData = async () => {
        try {
            let api = `${import.meta.env.VITE_BACK_URL}/employee/empdata/?id=${localStorage.getItem("empid")}`;
            const response = await axios.get(api);
            setmydata(response.data) 
            
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        loadData();
    }, [])

    const compTask = mydata.filter(task => task.taskstatus === "FullyCompleted").length;
    const nocompTask = mydata.filter(task => task.taskstatus === "NoCompleted").length;
    const partialtask = mydata.filter(task => task.taskstatus === "PartialCompleted").length;


    return (
        <>
            <section id='emphome'>

                <h1> Welcome to the Employees home page</h1>
                <p> here, you can know all about your tasks </p>

                <div id='emphomecontainer'>

                    <div className='emphometask'>
                        <p> Total </p>
                        <p> {mydata.length} </p> 
                        <p> 📋 </p>
                    </div>

                    <div className='emphometask'>
                        <p> Completed  </p>
                        <p> {compTask}  </p>
                        <p> ✅</p>
                        
                    </div>
                    <div className='emphometask'>
                        <p> Incomplete </p>
                        <p> {nocompTask} </p> 
                        <p>❎</p>
                    </div>

                    <div className='emphometask'>
                        <p> Partially Completed </p>
                        <p> {partialtask}</p>
                        <p> 🤏 </p>
                    </div>

                </div>



            </section>
        </>
    )
}

export default EmpHome; 

# my task emp 
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import "../css/employee.css"


const MyTask = () => {
  const [mydata, setmydata] = useState([]);
  const [show, setShow] = useState(false);

  const [taskstatus, setTaskStatus] = useState("");
  const [taskduration, setTaskDuration] = useState("");
  const [taskId, setTaskId] = useState("");


  const [search, setSearch] = useState("");


  const handleClose = () => setShow(false);   // not show form pop up . inital false



  const loadData = async () => {
    try {
      let api = `${import.meta.env.VITE_BACK_URL}/employee/showtask/?id=${localStorage.getItem("empid")}`;
      const response = await axios.get(api);
      console.log(response.data);
      setmydata(response.data);
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadData();
  }, [])



  const taskReportSubmit = async (e) => {
    e.preventDefault();
    try {
      let api = `${import.meta.env.VITE_BACK_URL}/employee/taskreport`;
      const response = await axios.put(api, { taskstatus, taskduration, taskId });
      console.log(response.data.msg);
    }
    catch (error) {
      console.log(error);
    }
  }


  const filteredData = mydata.filter((each) =>
    each.task.toLowerCase().includes(search.toLowerCase())
  );

  let sno = 0;
  const ans = filteredData.map((key) => {
    sno++;
    // if (!key.submitstatus) {
    return (
      <>
        <tr>
          <td> {sno} </td>
          <td>{key.task}</td>
          <td>{key.duration}</td>
          <td>{key.priority}</td>
          {/* <td>{assign task handleshow button}</td> */}
        </tr>
      </>
    )
    // }
  })



  return (
    <>
      <h1>My Task details</h1>
      <hr />

      {/*                            Search Your data here     */}

      <div id='searchtaskbar'>
        <span> Search your task here..</span>
        <input
        
          id='searchtask'
          type="text"
          placeholder="🔍 Enter task name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button id='searchbtn'>Search it</button>
      </div>


      <hr />
      {/*                     here get emp data in table css dashboard  */}

      <div className="custom-table-wrapper">
        <Table className="custom-table" striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Task Detail</th>
              <th>Duration in Days</th>
              <th>Priority Level</th>
              {/* <th></th> */}
            </tr>
          </thead>
          
          <tbody>
            {ans}
          </tbody>
        </Table>
      </div>

      {/*                     here assign task to each emp  */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your Task Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Select Task Status</Form.Label>
              <Form.Select aria-label="Default select example" value={taskstatus} onChange={(e) => setTaskStatus(e.target.value)} >
                <option>select task status</option>
                <option value="FullyCompleted">Fully Completed</option>
                <option value="PartialCompleted">Partial Completed</option>
                <option value="NoCompleted">No Completed</option>
              </Form.Select>
            </Form.Group>


            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Completion Days</Form.Label>
              <Form.Control type="text" value={taskduration} onChange={(e) => setTaskDuration(e.target.value)} />
            </Form.Group>


            <Button variant="primary" type="submit" onClick={taskReportSubmit}>
              Submit Report
            </Button>

          </Form>
        </Modal.Body>
      </Modal>

    </>
  )
}

export default MyTask;

# employee.css 
/* ----------------------------------------------------
   GLOBAL RESETS
---------------------------------------------------- */

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden;
}

* {
  box-sizing: border-box;
}


/* ----------------------------------------------------
   GLOBAL PAGE SECTIONS  employee home 
---------------------------------------------------- */

#emphome,
#empsetting {
  width: 100%;
  min-height: 85vh;
  padding: 20px;
}

#emphome > h1,
#emphome > p,
#empsetting > h1 {
  text-align: center;
}

#emphome > p {
  font-size: 18px;
  font-style: italic;
  font-weight: bold;
  color: white;
}


/* ----------------------------------------------------
   EMPLOYEE HOME – CARDS GRID
---------------------------------------------------- */

#emphomecontainer {
  margin: 40px auto;
  width: 100%;
  display: grid;
  gap: 25px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.emphometask {
  width: 100%;
  min-height: 290px;
  background-color: rgb(189, 116, 245);
  border-radius: 15px;
  padding: 25px 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  transition: 0.3s;
}

.emphometask p {
  font-size: 35px;
  font-weight: bold;
  margin: 0;
  font-family: var(--font2, "Times New Roman");
}

.emphometask:hover {
  background-color: rgb(178, 88, 246);
  color: white;
}

.emphometask:hover p:nth-of-type(3) {
  transform: scale(1.4);
  transition: transform 0.3s ease;
}


/* ----------------------------------------------------
   SEARCH BAR   employee my task here
---------------------------------------------------- */

#searchtaskbar {
  text-align: center;
  margin: 20px 0;
}

#searchtaskbar > span {
  font-size: 18px;
  font-weight: bold;
}

#searchtask {
  padding: 6px 10px;
  font-size: 18px;
  border-radius: 10px;
  border: 1px solid lightgray;
  width: 250px;
  max-width: 80%;
  margin-left: 10px;
}

#searchbtn {
  background-color: rgb(208, 208, 208);
  border: 2px solid rgb(155, 155, 155);
  padding: 6px 12px;
  font-size: 18px;
  border-radius: 6px;
  margin-left: 10px;
}


/* ----------------------------------------------------
   PASSWORD EMPLOYEE ADMIN .... CHANGE PAGES  setting , settings 
---------------------------------------------------- */

/* Shared container styles */
#passemp,
#passadmin {
  width: 100%;
  display: flex;
  gap: 40px;
  align-items: center;
  justify-content: center;
  padding: 30px 10px;
  flex-wrap: wrap;        /* Makes it stack on small screens */
}

/* Shared image scaling */
#passemp > img,
#passadmin > img {
  width: 350px;
  max-width: 90%;
  height: auto;
}

/* Shared password form */
.passform {
  width: 100%;
  max-width: 420px;
  padding: 20px;
  background-color: white;
  border: 3px solid rgb(210, 140, 251);
  border-radius: 20px;

  display: flex;
  flex-direction: column;
  gap: 15px;

  color: rgb(0, 0, 178);
}

#passkey {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: rgb(64, 64, 249);
  padding: 10px;
  margin: 0 auto;
}

.passlabel {
  font-size: 20px;
  font-weight: bold;
}

.passinput {
  width: 100%;
  padding: 8px 10px;
  font-size: 18px;
  border: 1px solid black;
  border-radius: 6px;
}

.subpass {
  background-color: blue;
  color: white;
  width: 140px;
  font-size: 20px;
  padding: 8px;
  font-weight: bold;
  border-radius: 8px;
  align-self: center;
  margin-top: 10px;
}


/* ----------------------------------------------------
  DATA TABLE RESPONSIVE WRAPPER
---------------------------------------------------- */
.custom-table-wrapper {
  width: 100%;
  overflow-x: auto;
}


/* ----------------------------------------------------
   MEDIA QUERIES
---------------------------------------------------- */

@media (max-width: 768px) {
  #emphome > p {
    font-size: 16px;
  }

  .emphometask p {
    font-size: 20px;
  }

  #searchtaskbar > span {
    display: block;
    margin-bottom: 8px;
  }

  #searchtask {
    width: 90%;
    display: block;
    margin: 10px auto;
  }

  #searchbtn {
    margin-top: 10px;
  }

  /* Password pages */
  #passemp,
  #passadmin {
    gap: 20px;
    padding: 20px;
  }

  #passkey {
    width: 70px;
    height: 70px;
  }

  .subpass {
    width: 120px;
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .emphometask {
    min-height: 150px;
  }

  .emphometask p {
    font-size: 18px;
  }

  #searchtask,
  #searchbtn {
    font-size: 16px;
  }

  .passlabel {
    font-size: 18px;
  }

  .passinput {
    font-size: 16px;
  }
}

# submitted task emp 
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/esm/Table';
import "../css/employee.css"

const SubmittedTask = () => {
    const [mydata, setmydata] = useState([]);

    const loadData = async () => {
        try {
            let api = `${import.meta.env.VITE_BACK_URL}/employee/showtask/?id=${localStorage.getItem("empid")}`;
            const response = await axios.get(api);
            console.log(response.data);
            setmydata(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    let sno = 0;
    const ans = mydata.map((key) => {
        sno++;
        if (key.submitstatus) {
            return (
                <>
                    <tr>
                        <td> {sno} </td>
                        <td>{key.task}</td>
                        <td>{key.duration}</td>
                        <td>{key.priority}</td>
                    </tr> 
                </>
            )
        }
    })


    return (
        <>
            <div>

                <h1> Tasks You have submitted </h1>
                <hr />

                <div className="custom-table-wrapper">
                    <Table className="custom-table" striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Task Detail</th>
                                <th>Duration in Days</th>
                                <th>Priority Level</th>
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

export default SubmittedTask; 


