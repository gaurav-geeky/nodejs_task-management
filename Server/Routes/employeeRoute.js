const express = require("express");
const route = express.Router();

const EmpController = require("../Controller/employeeController");

route.post("/login", EmpController.empLogin);
route.get("/showtask", EmpController.showTask);
route.put("/taskreport", EmpController.taskReport);
route.get("/empdata", EmpController.empData);
route.post("/changepass", EmpController.changePassword);


module.exports = route; 

