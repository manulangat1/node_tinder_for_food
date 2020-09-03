const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


const TokenSchema = new mongoose.Schema({
    _userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    tokens :[{
        token:{
            type:String,
            required:true
        }
    }],
    createdAt:{
        type:Date,
        required:true,
        default:Date.now,
        expires:43200
    }
})

const Token = mongoose.model('Token',TokenSchema)
module.exports = Token