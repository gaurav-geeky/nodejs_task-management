

const AdminModel = require('../Model/adminModel');
const UserPassword = require('../middleware/randomPassword');
// mailer.js

const emailSend = require('../middleware/empMail');
const EmpModel = require('../Model/empModel');
const empModel = require('../Model/empModel');
const taskModel = require('../Model/taskModel');
const adminModel = require('../Model/adminModel');


const adminLogin = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    const Admin = await AdminModel.findOne({ email: email });

    if (!Admin) {
        res.status(401).send({ msg: "Invalid admin Email.." });
    }

    if (Admin.password != password) {
        res.status(401).send({ msg: "Invalid admin Password.." });
    }

    return res.status(200).send({ Admin: Admin, msg: "Admin Login Succesfull..." });

}

// create new employee
const userCreate = async (req, res) => {
    const { empname, empmail, designation } = req.body;
    const emppass = UserPassword.myPassword()  // random password 

    console.log("pass generated : ", UserPassword.myPassword());
    res.send("User created successfully !");

    emailSend.userNodeMail(empname, empmail, emppass); // sending mail

    // Now, usercreate after send user his details 
    const Employee = await EmpModel.create({
        name: empname,
        email: empmail,
        designation: designation,
        password: emppass,
    })
    console.log('empname : ', empname, 'empmail : ', empmail, 'emppass : ', emppass);

    res.status(201).send("user Successfully crreated !!");
}

// disply employee to give task
const empDisplay = async (req, res) => {
    const employee = await empModel.find();
    res.status(200).send(employee);
}

// assign task 
const taskSave = async (req, res) => {
    console.log(req.body)
    const { id, task, duration, priority } = req.body;
    const emptask = await taskModel.create({
        task: task,
        duration: duration,
        priority: priority,
        empid: id
    })
    console.log("total task : ", task)
    res.status(201).send({ msg: "Task Successfully assigned ..." });
}

// admin home total tasks display. 
const dashboardStats = async (req, res) => {
    try {
        const totalUsers = await empModel.countDocuments();

        const totalTasks = await taskModel.countDocuments();
        const completedTasks = await taskModel.countDocuments({ submitstatus: true });
        const partiallyCompleted = await taskModel.countDocuments({ taskstatus: "Partially Completed" });
        const pendingTasks = await taskModel.countDocuments({ submitstatus: false });

        res.status(200).send({
            totalUsers,
            totalTasks,
            completedTasks,
            partiallyCompleted,
            pendingTasks
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Internal Server Error" });
    }
};

// emp task report
const taskReportDisplay = async (req, res) => {
    const taskreport = await taskModel.find({ submitstatus: true }).populate("empid");
    res.status(201).send(taskreport);
}

const taskReassign = async (req, res) => {
    const task = await taskModel.findByIdAndUpdate(req.query.id, {
        submitstatus: false
    });
    res.status(201).send({ msg: "Task has been Reassigned ..." });
}


// password
const changePassword = async (req, res) => {
    const { adminId, newpass } = req.body
    const changepass = await adminModel.findByIdAndUpdate(adminId, {
        password: newpass
    });
    res.status(201).send({ mypass: changepass, msg: "Admin Pass changed successfully !!" });
}


module.exports = {
    adminLogin,
    userCreate,
    empDisplay,
    taskSave,
    dashboardStats,
    taskReportDisplay,
    taskReassign,
    changePassword

}

