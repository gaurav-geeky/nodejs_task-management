const express = require("express");
const route = express.Router();

const EmpController = require("../Controller/employeeController");


route.post("/login", EmpController.empLogin);  // form
route.get("/auth", EmpController.empAuth);  // auth in login

route.get("/showtask", EmpController.showTask);   // my task
route.put("/taskreport", EmpController.taskReport);  // remaining task, show
route.get("/empdata", EmpController.empData);
route.post("/changepass", EmpController.changePassword); // setting


module.exports = route; 

