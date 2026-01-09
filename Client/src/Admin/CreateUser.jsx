import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const CreateUser = () => {

    const initial = {
        empname: "",
        empmail: "",
        designation: "",
    }
    const [userdata, setuserdata] = useState(initial);

    const handleInput = (e) => {
        setuserdata({ ...userdata, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const api = `${import.meta.env.VITE_BACK_URL}/admin/usercreate`;
            const res = await axios.post(api, userdata);
            toast.success(res.data);
            setuserdata({ empname: "", empmail: "", designation: "" });
        } catch (error) {
            toast.error("Failed to create user");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-full bg-[#3b3fb8]">
            {/* CONTAINER */}
            <div className="px-12 py-14 text-white">

                {/* TITLE */}
                <h1 className="text-3xl font-semibold text-center">
                    Create New User
                </h1>
                <p className="text-center text-white/80 mt-2 mb-10">
                    Add an employee and grant workspace access
                </p>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="w-[450px] mx-auto ">

                    {/* NAME */}
                    <div className="mb-6">
                        <label className="block text-lg mt-3">
                            Employee Name
                        </label>
                        <input
                            type="text"
                            name="empname"
                            value={userdata.empname}
                            onChange={handleInput}
                            placeholder="John Doe"
                            required
                            className="w-full px-5 py-3 rounded-full bg-white/10 text-white outline-none"
                        />
                    </div>

                    {/* EMAIL */}
                    <div className="mb-6">
                        <label className="block text-lg mt-3">
                            Employee Email
                        </label>
                        <input
                            type="email"
                            name="empmail"
                            value={userdata.empmail}
                            onChange={handleInput}
                            placeholder="john@company.com"
                            required
                            className="w-full px-5 py-3 rounded-full bg-white/10 text-white outline-none"
                        />
                    </div>

                    {/* DESIGNATION */}
                    <div className="mb-10">
                        <label className="block text-lg mt-3">
                            Designation
                        </label>
                        <select
                            name="designation"
                            value={userdata.designation}
                            onChange={handleInput}
                            required
                            className="w-full px-5 py-3 rounded-full bg-white/10 text-white outline-none"
                        >
                            <option value="" className="text-black">
                                Select designation
                            </option>
                            <option className="text-black">Programmer</option>
                            <option className="text-black">Tester</option>
                            <option className="text-black">Designer</option>
                            <option className="text-black">Analyst</option>
                            <option className="text-black">DB Designer</option>
                        </select>
                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        className="inline-block px-4 py-2 mt-5 !rounded-full bg-white text-[#3b3fb8] font-semibold text-lg"
                    >
                        Submit
                    </button>

                </form>
            </div>
        </div>
    );
};

export default CreateUser;

