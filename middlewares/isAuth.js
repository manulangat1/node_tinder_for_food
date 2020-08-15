const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Token = require('../models/Token')


exports.isAuth = (req,res,next) => {
    try{
        const token = req.header('Authorization').replace('Bearer','')
        const data = jwt.verify(token,process.env.JWT_KEY)
        const tokenData = await Token.findOne({'tokens.token':token})
        const user = await User.findById(tokenData._userId)
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
        console.log(`Error:${err}`)
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}