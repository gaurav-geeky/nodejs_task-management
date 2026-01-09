
import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const AdminDashBoard = () => {
    const adminname = localStorage.getItem("adminname");
    const adminemail = localStorage.getItem("adminemail");
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <div className="flex h-screen overflow-hidden">

            {/* ================= SIDEBAR ================= */}
            <aside className="w-64 bg-slate-800 text-white flex flex-col">
                {/* LOGO */}
                <div className="px-6 py-5 text-xl font-bold border-b border-slate-700 flex justify-center">
                    <span className="text-indigo-400">Task</span>Admin
                </div>

                {/* MENU */}
                <nav className="flex flex-col gap-3 px-3 py-4">
                    <NavLink
                        to="/admin-dashboard"
                        end
                        style={{ textDecoration: "none" }}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg  
                        ${isActive ? "bg-slate-600 text-white font-bold"
                                : "!text-green-300 hover:bg-slate-600"
                            }`
                        }
                    >
                        🏠 Dashboard
                    </NavLink>

                    <NavLink
                        to="create-user"
                        style={{ textDecoration: "none" }}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg 
                        ${isActive ? "bg-slate-600 text-white font-bold"
                                : "!text-green-300 hover:bg-slate-600"
                            }`
                        }
                    >
                        👤 Create User
                    </NavLink>

                    <NavLink
                        to="assign-task"
                        style={{ textDecoration: "none" }}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg 
                        ${isActive ? "bg-slate-600 text-white font-bold"
                                : "!text-green-300 hover:bg-slate-600"
                            }`
                        }
                    >
                        🎯 Assign Task
                    </NavLink>

                    <NavLink
                        to="report"
                        style={{ textDecoration: "none" }}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg 
                        ${isActive ? "bg-slate-600 text-white font-bold"
                                : "!text-green-300 hover:bg-slate-600"
                            }`
                        }
                    >
                        📊 Reports
                    </NavLink>

                    <NavLink
                        to="setting"
                        style={{ textDecoration: "none" }}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg 
                        ${isActive ? "bg-slate-600 text-white font-bold"
                                : "!text-green-300 hover:bg-slate-600"
                            }`
                        }
                    >
                        ⚙️ Settings
                    </NavLink>
                </nav>
            </aside>

            {/* ================= MAIN AREA ================= */}
            <main className="flex-1 flex flex-col">
                {/* TOP BAR */}
                <header className="h-16 bg-white border-b flex items-center justify-between py-5 ">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-72 px-4 py-2 border mx-3  rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />

                    <div className="flex items-center gap-4 mx-3">

                        <div className="text-sm text-right">
                            <div className="font-semibold text-gray-800">
                                {adminname}
                            </div>
                            <div className="text-gray-500">
                                {adminemail}
                            </div>
                        </div>

                        <button
                            onClick={logout}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    </div>

                </header>

                {/* ================= CONTENT ================= */}
                <section className="flex-1 overflow-y-auto bg-slate-50 p-10">
                    <Outlet />
                </section>

            </main>
        </div>
    );
};

export default AdminDashBoard;
