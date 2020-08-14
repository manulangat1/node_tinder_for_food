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
    },
    isActive:{
        type:Boolean,
        default:false
    }
})

UserSchema.pre('save',  async function(next){
    const user = this 
    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
})


UserSchema.statics.findByCredentials = async (email,password) => {
    //search for user using email and password 
    const user = await User.findOne({email})
    if (!user){
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password,user.password)
    if(!isPasswordMatch){
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user

    
}

const User = mongoose.model('User',UserSchema)
module.exports =  User