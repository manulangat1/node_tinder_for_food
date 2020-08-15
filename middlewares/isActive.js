exports.isActive = async(req,res,next) => {
    try{
        if(req.user && req.user.isActive){
             return next()
        } else{
            // console.log(`Error:${err}`)
        res.status(400).json({
            success:false,
            message:'Account not activated yet'
        })
        }
    } catch (err){
        console.log(`Error:${err}`)
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}