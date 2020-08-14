const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


const TokenSchema = new mongoose.Schema({
    _userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    token :{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now,
        expires:43200
    }
})

TokenSchema.methods.generateAuthToken = async function(user){
    const tokena = jwt.sign({_id:user._id},process.env.JWT_KEY)
    const token = new Token({
        _userId:user._id,
        token:tokena
    })
    await token.save()
    return tokena
}
const Token = mongoose.model('Token',TokenSchema)
module.exports = Token