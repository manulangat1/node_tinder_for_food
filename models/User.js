const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


const UserSchema  = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        minlength:8
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:8
    }
})