
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const bodyparser = require('body-parser')
const cors = require('cors');
const AdminRoute = require('./Routes/adminRoute');
const EmpRoute = require("./Routes/employeeRoute");


mongoose
    .connect(process.env.DBCONN, {
        serverSelectionTimeoutMS: 5000  // ❌ REMOVE tls
    })
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

console.log("👉 DB URI from ENV:", process.env.DBCONN);




// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

// use of CORS middlewarre
app.use(cors());


// app.use(cors({
//     origin: ["https://front5-w312.onrender.com"],  // allow frontend
//     methods: "GET,POST,PUT,DELETE,PATCH",
//     credentials: true,
// }));


app.use("/admin", AdminRoute);
app.use("/employee", EmpRoute);


const port = process.env.PORT || 9999
app.listen(port, () => {
    console.log(`server is running at ${port} port !`);
});

