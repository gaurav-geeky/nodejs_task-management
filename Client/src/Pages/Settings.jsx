import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Settings = () => {
    const [oldpass, setOldpass] = useState("");
    const [newpass, setNewpass] = useState("");
    const [confirmpass, setConfirmpass] = useState("");

    const empPass = localStorage.getItem("empPass");
    const empId = localStorage.getItem("empid");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (oldpass !== empPass) {
            toast.error("Old password is incorrect!");
            return;
        }

        if (newpass !== confirmpass) {
            toast.error("New passwords do not match!");
            return;
        }

        try {
            const api = `${import.meta.env.VITE_BACK_URL}/employee/changepass`;
            const res = await axios.post(api, { empId, newpass });
            toast.success(res.data.msg);
        } catch (err) {
            toast.error("Failed to update password");
        }
    };

    return (
        <div className="min-h-screen bg-[#3b3fb8] py-10 overflow-y-auto flex justify-center">


            {/* CONTAINER */}
            <div className="px-3 py-5 text-white max-w-xl w-[500px] m-auto ">

                {/* TITLE */}
                <div className="text-3xl font-semibold text-center ">
                    Change Your Account Password
                </div>

                {/* SUBTITLE */}
                <p className="text-center text-white/70 mt-2 mb-10 w-[420px]">
                    Update your password regularly to keep your account secure.
                    Enter your old password and create a new one of your choice.
                </p>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="w-[450px] mx-auto">

                    {/* OLD PASSWORD */}
                    <div className="mb-6">
                        <label className="block text-lg mt-3">Old Password</label>
                        <input
                            type="password"
                            placeholder="Enter old password"
                            onChange={(e) => setOldpass(e.target.value)}
                            required
                            className="w-full px-5 py-3 rounded-full bg-white/10 text-white outline-none"
                        />
                    </div>

                    {/* NEW PASSWORD */}
                    <div className="mb-6">
                        <label className="block text-lg mt-3">New Password</label>
                        <input
                            type="password"
                            placeholder="Enter new password"
                            onChange={(e) => setNewpass(e.target.value)}
                            required
                            className="w-full px-5 py-3 rounded-full bg-white/10 text-white outline-none"
                        />
                    </div>

                    {/* CONFIRM PASSWORD */}
                    <div className="mb-10">
                        <label className="block text-lg mt-3">Confirm New Password</label>
                        <input
                            type="password"
                            placeholder="Confirm new password"
                            onChange={(e) => setConfirmpass(e.target.value)}
                            required
                            className="w-full px-5 py-3 rounded-full bg-white/10 text-white outline-none"
                        />
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

export default Settings;
