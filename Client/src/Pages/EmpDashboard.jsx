
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const EmpDashboard = () => {
    const navigate = useNavigate();
    const mytoken = localStorage.getItem("emptoken");
    const [user, setUser] = useState(null);

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    useEffect(() => {
        const fetchUser = async () => {
            if (!mytoken) {
                navigate("/");
                console.log("no verified token");
                return;
            }
            try {
                console.log(`my verified token : ${mytoken}`);
                const api = `${import.meta.env.VITE_BACK_URL}/employee/auth`;

                const res = await axios.get(api, {
                    headers: { "auth-token": mytoken }
                });
                setUser(res.data.employee);
            }
            catch (error) {
                navigate("/");
            }
        };

        fetchUser();
    }, [mytoken]);


    return (
        <div className="flex h-screen overflow-hidden bg-gray-100">

            {/* LEFT SIDEBAR */}
            <aside className="w-64 bg-slate-800 text-white flex flex-col py-6">

                <div className="px-6 py-5 text-xl font-bold border-b border-slate-700 flex justify-center">
                    <span className="text-green-400">Employee</span>Panel
                </div>


                <nav className="flex flex-col gap-3 px-4">
                    <NavLink
                        to="/emp-dashboard"
                        end
                        style={{ textDecoration: "none" }}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg  
                        ${isActive ? "bg-slate-600 text-white font-bold" : "!text-yellow-200 hover:bg-slate-600"
                            }`
                        }
                    >
                        🏠 Panel
                    </NavLink>

                    <NavLink
                        to="mytask"
                        style={{ textDecoration: "none" }}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg 
                        ${isActive ? "bg-slate-600 text-white font-bold" : "!text-yellow-200 hover:bg-slate-600"
                            }`
                        }
                    >
                        📋 Total Tasks
                    </NavLink>

                    <NavLink
                        to="submitedtask"
                        style={{ textDecoration: "none" }}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg 
                        ${isActive ? "bg-slate-600 text-white font-bold" : "!text-yellow-200 hover:bg-slate-600"
                            }`
                        }
                    >
                        🏆 Submitted Tasks
                    </NavLink>

                    <NavLink
                        to="remainingTask"
                        style={{ textDecoration: "none" }}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg 
                        ${isActive ? "bg-slate-600 text-white font-bold" : "!text-yellow-200 hover:bg-slate-600"
                            }`
                        }
                    >
                        ⚠️ Remaining Tasks
                    </NavLink>

                    <NavLink
                        to="settings"
                        style={{ textDecoration: "none" }}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg 
                        ${isActive ? "bg-slate-600 text-white font-bold" : "!text-yellow-200 hover:bg-slate-600"
                            }`
                        }
                    >
                        ⚙️ Settings
                    </NavLink>
                </nav>
            </aside>


            {/* MAIN CONTENT */}
            <div className="flex-1">

                {/* TOP BAR */}
                <header className="flex justify-between items-center bg-white shadow py-3">

                    <div className="mx-3 text-lg font-semibold">
                        {/* welcome user */}
                        Welcome,
                        <span className="text-blue-600"> {user?.name} , {user?.designation}

                        </span>
                    </div>

                    <div className="mx-3">
                        <button
                            onClick={logout}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                        >
                            Logout
                        </button>
                    </div>
                </header>

                {/* PAGE CONTENT */}
                <main className="w-full block p-10 overflow-visible">
                    <Outlet />
                </main>

            </div>
        </div>
    );
};

export default EmpDashboard;




