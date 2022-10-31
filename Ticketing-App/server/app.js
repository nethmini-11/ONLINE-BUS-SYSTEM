const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.get('/', (req,res)=>{
    console.log("Responding to root route");
    res.send("This is the REST API for Ticketing App");
});

const postsRoute = require('./routes/posts');
const usersRoute = require('./routes/users');
const complaintsRoute = require('./routes/complaints');
const loginRoute = require('./routes/login');
const dashboardRoute = require('./routes/dashboards');
const passengerDashboardRoute = require('./routes/passengerdashboard');
const inspectedbussRoute = require('./routes/inpectedbuss');
const inspectreportRoute = require('./routes/inspectreports');
const timetableRoute = require('./routes/timetables');
const journeyRoute = require('./routes/journeys');
const journeyRoute2 = require('./routes/journeys2');
const fundsRoute = require('./routes/funds');

app.use(cors());
app.use(bodyParser.json());

app.use("/posts",postsRoute);
app.use("/users",usersRoute);
app.use("/complaints",complaintsRoute);
app.use("/login",loginRoute);
app.use("/dashboards",dashboardRoute);
app.use("/passengerdashboard",passengerDashboardRoute);
app.use("/inspectdebuss",inspectedbussRoute);
app.use("/inspectreports",inspectreportRoute);
app.use("/timetables", timetableRoute);
app.use("/journeys", journeyRoute);
app.use("/journeysfind",journeyRoute2);
app.use("/funds",fundsRoute);

module.exports = app