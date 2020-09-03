const User = require('../models/User')



exports.isAdmin = async(req,res,next) => {
    try{
        if (req.user && req.user.isAdmin){
            next()
        } else{
            res.status(403).json({
                success:false,
                message:'You do not have sufficient permissions to view this page'
            })
        }
    } catch(err){
        console.log(`Error:${err}`)
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}