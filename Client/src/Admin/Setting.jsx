import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Setting = () => {

    const [oldpass, setoldpass] = useState("");
    const [newpass, setnewpass] = useState("");
    const [confirmpass, setconfirmpass] = useState("");

    const adminPass = localStorage.getItem("adminPass");
    const adminId = localStorage.getItem("adminId");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (oldpass !== adminPass) {
            toast.error("Old password is incorrect.");
            return;
        }

        if (newpass !== confirmpass) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            let api = `${import.meta.env.VITE_BACK_URL}/admin/changepass`;
            const response = await axios.post(api, {
                adminId,
                newpass,
                confirmpass,
            });

            toast.success(response.data.msg);
            setoldpass("");
            setnewpass("");
            setconfirmpass("");

        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#3b3fb8]">
            {/* CONTAINER */}
            <div className="px-3 py-5 rounded-xl shadow-xl">

                {/* TITLE */}
                <h1 className="text-3xl font-semibold text-center text-white">
                    Change Password
                </h1>
                <p className="text-center text-gray-200 mt-2 mb-10">
                    Update your admin login password securely.
                </p>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="w-[450px] mx-auto">

                    {/* OLD PASSWORD */}
                    <div className="mb-6">
                        <label className="block text-lg mt-3 text-white">Old Password</label>
                        <input
                            type="password"
                            placeholder="Enter old password"
                            value={oldpass}
                            onChange={(e) => setoldpass(e.target.value)}
                            required
                            className="w-full px-5 py-3 rounded-full bg-[#e5e6fa] text-black outline-none"
                        />
                    </div>

                    {/* NEW PASSWORD */}
                    <div className="mb-6">
                        <label className="block text-lg mt-3 text-white">New Password</label>
                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={newpass}
                            onChange={(e) => setnewpass(e.target.value)}
                            required
                            className="w-full px-5 py-3 rounded-full bg-[#e5e6fa] text-black outline-none"
                        />
                    </div>

                    {/* CONFIRM PASSWORD */}
                    <div className="mb-8">
                        <label className="block text-lg mt-3 text-white">Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Confirm new password"
                            value={confirmpass}
                            onChange={(e) => setconfirmpass(e.target.value)}
                            required
                            className="w-full px-5 py-3 rounded-full bg-[#e5e6fa] text-black outline-none"
                        />
                    </div>

                    {/* SUBMIT BUTTON */}
                    <button
                        type="submit"
                        className="inline-block px-4 py-2 mt-5 !rounded-full bg-white font-semibold text-lg"
                    >
                        Submit
                    </button>

                </form>
            </div>
        </div>
    );
};

export default Setting;
