const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Token = require('../models/Token')


exports.isAuth = async(req,res,next) => {
    try{
        // const token = req.header('Authorization').replace('Bearer','')
        const token = req.header('Authorization').replace('Bearer ','')
        const data = jwt.verify(token,process.env.JWT_KEY)
        // console.log(token)
        const tokens = await Token.findOne({_userId:data._id,'tokens.token':token})
        // console.log(tokens)

        const user = await User.findById(tokens._userId)
        if (!user){
            res.status(401).json({
                success:false,
                message:'Invalid token'
            })
        } else{
            req.user = user 
            req.token = token 
            next()
        }
    } catch (err){
        console.log(`Error:${err}`.red.underline)
        res.status(401).json({
            success:false,
            message:'Invalid token'
        })
    }
}