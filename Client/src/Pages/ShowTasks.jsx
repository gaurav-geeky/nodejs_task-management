
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const ShowTasks = () => {
    const [tasks, setTasks] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    // 1️⃣ Read status from URL
    const status = new URLSearchParams(location.search).get("status");

    // 2️⃣ Load all employee tasks (no filtering here)
    const loadTasks = async () => {
        try {
            const api = `${import.meta.env.VITE_BACK_URL}/employee/emptaskdata?id=${localStorage.getItem("empid")}`;
            const res = await axios.get(api);
            setTasks(res.data);  
        } 
        catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);

    // 3️⃣ Filter tasks on frontend
    const filteredTasks = status ?
        tasks.filter(task => task.taskstatus === status)
        : tasks;

    // 4️⃣ Dynamic title
    const pageTitle = status ? `${status} Tasks` : "All Tasks";

    return (
        <section className="p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">
                    {pageTitle}</h1>

                <button
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded"
                >
                    ← Back
                </button>
            </div>

            {/* Task Table */}
            <table className="w-full border">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2">#</th>
                        <th className="border p-2">Task</th>
                        <th className="border p-2">Duration</th>
                        <th className="border p-2">Priority</th>
                        <th className="border p-2">Status</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map((task, index) => (
                            <tr key={task._id}>
                                <td className="border p-2 text-center">{index + 1}
                                </td>
                                <td className="border p-2">{task.task}
                                </td>
                                <td className="border p-2 text-center">{task.duration}
                                </td>
                                <td className="border p-2 text-center">{task.priority}
                                </td>
                                <td className="border p-2 text-center">{task.taskstatus}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="p-4 text-center text-gray-500">
                                No tasks found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

        </section>
    );
};

export default ShowTasks;



