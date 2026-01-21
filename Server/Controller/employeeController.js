
const empModel = require("../Model/empModel");
const EmpModel = require("../Model/empModel");
const TaskModel = require("../Model/taskModel");

// jwt and bcrypt
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const empLogin = async (req, res) => {
    const { email, password } = req.body;
    const employee = await EmpModel.findOne({ email: email });

    if (!employee) {
        res.status(401).send({ msg: "Invalid Employee Email !" });
    }

    const passValid = await bcrypt.compare(password, employee.password)
    if (!passValid) {
        return res.status(400).send({ msg: "Invalid Employee password." });
    }
    const token = jwt.sign({ id: employee._id }, "emp123", { expiresIn: "3d" });

    return res.status(200).send({
        employee: employee,
        msg: "user login successfull",
        token 
    }); 
} 

const empAuth = async (req, res) => {
    const token = req.header("auth-token");
    console.log("TOKEN : ", token);
    if (!token) return res.status(400).json({ msg: "NO token found" });

    try {
        const decode = await jwt.verify(token, "emp123");
        const employee = await empModel.findById(decode.id).select("-password -email");

        res.status(200).json({
            msg: `ok emp ${employee.name} has verified token`,
            employee, 
        });
    }
    catch (error) {
        console.log(error)
    }
}


const showTask = async (req, res) => {
    const { id } = req.query;
    const empData = await TaskModel.find({ empid: id });
    res.status(200).send(empData);
}

const taskReport = async (req, res) => {
    console.log(req.body)
    //  = req.body; 
    const { taskstatus, taskduration, taskId } = req.body;
    const task = await TaskModel.findByIdAndUpdate(taskId, {
        taskstatus: taskstatus,
        completionday: taskduration,
        submitstatus: true
    })

    res.send({ msg: "Task Submitted Successfully !! " });
}

const empData = async (req, res) => {
    console.log(req.query);
    const { id } = req.query;
    const empData = await TaskModel.find({ empid: id });
    res.status(200).send(empData);
}

const changePassword = async (req, res) => {
    const { empId, newpass } = req.body
    const changepass = await empModel.findByIdAndUpdate(empId, {
        password: newpass
    });
    res.status(201).send({ mypass: changepass, msg: "Emp Pass changed successfully !!" });
}


module.exports = {
    empLogin,
    empAuth,
    showTask,
    taskReport,
    empData,
    changePassword,

}