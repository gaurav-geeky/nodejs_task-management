
const empModel = require("../Model/empModel");
const EmpModel = require("../Model/empModel");
const TaskModel = require("../Model/taskModel")

const empLogin = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    const employee = await EmpModel.findOne({ email: email });

    if (!employee) {
        res.status(401).send({ msg: "Invalid Employee Email !" });
    }

    if (employee.password != password) {
        res.status(401).send({ msg: "Invalid Employee Password !" });
    }

    return res.status(200).send({ employee: employee });
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
    showTask,
    taskReport,
    empData,
    changePassword,

}