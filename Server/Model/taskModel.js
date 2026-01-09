
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    task: String,
    duration: Number,
    priority: String,
    empid: { type: mongoose.Schema.Types.ObjectId, ref: "employee" },
    taskstatus: String,        // newly created for getting complete 
    completionday: Number,          // incomplete task details
    submitstatus: Boolean,
})

module.exports = mongoose.model("task", taskSchema);


