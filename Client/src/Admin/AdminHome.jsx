import axios from "axios";
import React, { useEffect, useState } from "react";
import "../css/adminhome.css"


const AdminHome = () => {
    const [mydata, setmydata] = useState({}); 

    const loadDashboardData = async () => {
        try {
            const api = `${import.meta.env.VITE_BACK_URL}/admin/dashboard-stats`;
            const response = await axios.get(api);
            setmydata(response.data);
             console.log("mydata : ", mydata); 
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadDashboardData();
    }, []);




    return (
        <section id='adminhome'>

            <h1> Welcome to the Admins home page</h1>

            <div id='adminhomecontainer'>

                <div className='adminhometask'>
                    <p> Total Users </p>
                    <p> {mydata.totalUsers} </p>
                    <p> 📋 </p>
                </div>

                <div className='adminhometask'>
                    <p> Total Tasks  </p>
                    <p> {mydata.totalTasks}  </p>
                    <p> ✅</p>

                </div>
                <div className='adminhometask'>
                    <p> Completed Tasks </p>
                    <p> {mydata.completedTasks} </p>
                    <p>❎</p>
                </div>

                <div className='adminhometask'>
                    <p> Partially Completed </p>
                    <p> {mydata.partiallyCompleted}</p>
                    <p> 🤏 </p>
                </div>

                <div className='adminhometask'>
                    <p> Pending Completed </p>
                    <p> {mydata.pendingTasks}</p>
                    <p> 🔄 </p>
                </div>

            </div>



        </section>
    );
};

export default AdminHome;
