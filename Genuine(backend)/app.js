//smd
//const manufRouter = require("./routes/manfRoutes");
//const catgRouter = require("./routes/catgRoutes");
const distrRouter = require("./routes/distrRoutes")
const manfRouter = require("./routes/manfRoutes")
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');

const app = express()

app.use(express.json());
app.use(morgan("dev"))
app.use(function (req, res, next) {
console.log("kljkl")
    // Website you wish to allow to connect

    res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');



    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
//app.options("/api/v1/distr/login", cors())
//app.use(cors())

//smd about limit
//app.use(express.json({limit: "10kb"}));
app.use(cookieParser());
//app.use(cors())

//app.use("/api/v1/manufacturer", manufRouter);
//app.use("/api/v1/category", catgRouter)

app.use("/api/v1/distr", distrRouter)
app.use("/api/v1/manf", manfRouter)

module.exports = app;