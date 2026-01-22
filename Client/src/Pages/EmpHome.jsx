import axios from "axios";
import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";


const EmpHome = () => {
    const [mydata, setmydata] = useState([]);
    const navigate = useNavigate();

    const loadData = async () => {
        try {
            const api = `${import.meta.env.VITE_BACK_URL}/employee/empdata/?id=${localStorage.getItem("empid")}`;
            const response = await axios.get(api);
            setmydata(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const compTask = mydata.filter((task) => task.taskstatus === "FullyCompleted").length;
    const nocompTask = mydata.filter((task) => task.taskstatus === "NoCompleted").length;
    const partialtask = mydata.filter((task) => task.taskstatus === "PartialCompleted").length;

    return (
        <section className="pt-1 ">

            {/* Title Section */}
            <div className="text-4xl font-bold text-gray-900 text-center ">
                Employee Dashboard
            </div>
            <p className="text-gray-500 text-center mt-2 mb-12">
                Quick overview of your task performance
            </p>


            {/* Modern Cards */}
            <div className="grid grid-cols-4 justify-items-center p-4">

                {/* Total */}
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-200 shadow-lg rounded-2xl text-center hover:scale-105 transition-transform duration-300 w-60 p-2 cursor-pointer"
                    onClick={() => navigate("showemptasks")}>

                    <div className="text-5xl">📋</div>
                    <div className="text-lg font-semibold text-gray-600 mt-3">Total Tasks</div>
                    <p className="text-5xl font-extrabold text-indigo-600 mt-2">{mydata.length}</p>
                </div>

                {/* Completed */}
                <div className="bg-gradient-to-br from-green-50 to-green-200 shadow-lg rounded-2xl text-center hover:scale-105 transition-transform duration-300 w-60 p-2 cursor-pointer"
                    onClick={() => navigate("showemptasks?status=FullyCompleted")}>

                    <div className="text-5xl">✅</div>
                    <div className="text-lg font-semibold text-gray-600 mt-3">Completed</div>
                    <p className="text-5xl font-extrabold text-green-600 mt-2">{compTask}</p>
                </div>

                {/* Incomplete */}
                <div className="bg-gradient-to-br from-red-50 to-red-200 shadow-lg rounded-2xl text-center hover:scale-105 transition-transform duration-300 w-60 p-2 cursor-pointer"
                    onClick={() => navigate("showemptasks?status=NoCompleted")}>

                    <div className="text-5xl">❌</div>
                    <div className="text-lg font-semibold text-gray-600 mt-3">Incomplete</div>
                    <p className="text-5xl font-extrabold text-red-600 mt-2">{nocompTask}</p>
                </div>

                {/* Partial */}
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-200 shadow-lg rounded-2xl text-center hover:scale-105 transition-transform duration-300 w-60 p-2 cursor-pointer"
                    onClick={() => navigate("showemptasks?status=PartialCompleted")}>

                    <div className="text-5xl">🤏</div>
                    <div className="text-lg font-semibold text-gray-600 mt-3">Partially Completed</div>
                    <p className="text-5xl font-extrabold text-yellow-600 mt-2">{partialtask}</p>
                </div>
            </div>


            {/* Progress Bars Section */}
            <div
                className="border-b p-4"
                style={{ margin: "auto", marginTop: "20px", width: "800px" }}>

                <div className="text-2xl font-bold text-gray-700 pt-3 pb-3">Task Progress Breakdown</div>

                <div className="">

                    {/* Completed */}
                    <div>
                        <p className="font-semibold text-gray-700 mb-1">Completed</p>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                            <div
                                className="bg-green-500 h-4 rounded-full"
                                style={{ width: `${(compTask / mydata.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Incomplete */}
                    <div>
                        <p className="font-semibold text-gray-700 mb-1">Incomplete</p>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                            <div
                                className="bg-red-500 h-4 rounded-full"
                                style={{ width: `${(nocompTask / mydata.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Partial */}
                    <div>
                        <p className="font-semibold text-gray-700 mb-1">Partially Completed</p>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                            <div
                                className="bg-yellow-500 h-4 rounded-full"
                                style={{ width: `${(partialtask / mydata.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default EmpHome;

