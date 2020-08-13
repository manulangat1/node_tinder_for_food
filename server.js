const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const colors = require('colors')
const path = require('path')

// loading env variables 
dotenv.config({path:'./config/config.env'})

// import and load the connectDB function 
const connectDB = require('./config/db')
//call the function 
connectDB()

// initialiase app 
const app = express()

// configuring morgan 
if (process.env.NODE_ENV === "development"){
    app.use(morgan('dev'))
}

// initiliase body parse 
app.use(express.json())

//test res 
app.get('/',(req,res) => res.send("hey"))

//intiliase the port 
const PORT = process.env.PORT 

// make app discoverable 
app.listen(PORT,console.log(`COMS app running in ${process.env.NODE_ENV} mode on port:${PORT}`.yellow.underline))

module.exports = app