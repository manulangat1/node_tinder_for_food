const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const colors = require('colors')
const path = require('path')
const exphbs = require('express-handlebars')
const bodyParser = require("body-parser");
// loading env variables 
dotenv.config({path:'./config/config.env'})

// import and load the connectDB function 
const connectDB = require('./config/db')
//call the function 
connectDB()

// import routes 
const User = require('./routes/User')
const Recipe = require('./routes/Recipe')

// initialiase app 
const app = express()

// initiliase body parse 
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// configuring morgan 
if (process.env.NODE_ENV === "development"){
    app.use(morgan('dev'))
}





//setting up hbs 
app.engine('.hbs',exphbs({extname:'.hbs'}))
app.set('view engine', '.hbs')
//test res 
// app.get('/',(req,res) => res.send("hey"))
app.use('/auth/v1/',User)
app.use('/api/v1/recipes/',Recipe)
//intiliase the port 
const PORT = process.env.PORT 

// make app discoverable 
app.listen(PORT,console.log(`COMS app running in ${process.env.NODE_ENV} mode on port:${PORT}`.yellow.underline))

module.exports = app