const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Token = require('../models/Token')
const  { sendmail} = require('../utils/mailer')



const generateAuthToken = async (user) => {
    try{

        const tokenb = await Token.findOne({_userId:user})
        // console.log(tokenb)
        if (tokenb){
            const token = jwt.sign({_id:user},process.env.JWT_KEY)
            tokenb.tokens = tokenb.tokens.concat({token})
            await tokenb.save()
            return token
            
        } else{
            const tokena = jwt.sign({_id:user},process.env.JWT_KEY)
            const token = new Token({
                _userId:user,
                token:tokena
            })
            await token.save()
            return tokena 
        }
         
            
    } catch (err) {
        console.log(`Error:${err}`)
    }
}
 

exports.registerUser = async (req,res,next) => {
    try{
        const {  email,username,password} = req.body
        const user = new User({email,username,password})
        if (user){
            // console.log(user)
            const token = await generateAuthToken(user._id)
            if (token){
                await user.save()
                const mail = {
                    from:process.env.EMAIL,
                    to:`${email}`,
                    subject: 'Account Verification Token',
                    html:'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/auth/v1/confirmation\/' + token + '.\n'
                }
                await sendmail(mail)
                res.status(201).json({
                    success:true,
                    data:user,
                    token:token
                })
            }
            
        }
    } catch(err){
        console.log(`Error! :${err}`.red.bold)
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}

exports.loginUser = async (req,res,next) => {
    try{
        const { email,password } = req.body
        const user = await User.findByCredentials(email,password)
        if (user){
            const token = await generateAuthToken(user._id)
            console.log(token)
            if(token){
                res.status(200).json({
                    success:true,
                    data:user,
                    token:token  
                })
            }
            
        } else{
            return res.status(404).json({
                success:false,
                message:'User not found'
            })
        }
        
    } catch (err) {
        console.log(`Error! :${err.messages}`.red.bold)
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}
exports.confirmToken = async(req,res) => {
    // console.log(req.params)
    try{
        const token = req.params.token
        // console.log(token)
        const token_ = await Token.findOne({'tokens.token':token})
        // console.log(token_)
        if (!token_){
            return res.status(400).json({
                success:false,
                message:'User not found..'
            })
        } else{
            const userid = await token_._userId
        const user =  await User.findOne({_id:userid})
        if (!user){
            res.status(400).json({
                success:false,
                message:'User not found..'
            })
        } else{
            user.isActive = true 
        await user.save()
        console.log(user)
        res.status(200).json({
            success:true,
            message:'Activation Successful, Login in to continue'
        })
        }
        }
        
        
    } catch(err){
        console.log(`Error! :${err}`.red.bold)
        return res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}

exports.loadUser = async (req,res) => {
    try{
        res.status(200).json({
            success:true,
            user:req.user,
            token:req.token
        })
    } catch (err){
        console.log(`Error! :${err}`.red.bold)
        return res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}

exports.logOutUser = async(req,res,next) => {
    try{
        const token = await Token.findOne({'tokens.token':req.token})
        if (token){
            await token.deleteOne()
        // await req.user.save()
        res.status(200).json({
            success:true,
            message:'Logged out successfully'
        })
        }
        res.status(401).json({
            success:false,
            message:'Invalid token'
        })
    } catch (err){
        console.log(`Error! :${err}`.red.bold)
        return res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}
exports.resendConfirm = async (req,res) => {
    try{
        const { email } = req.body
        const user = await User.findOne({email:email})
        const token = await generateAuthToken(user._id)
        const mail = {
            from:process.env.EMAIL,
            to:`${email}`,
            subject: 'Account Verification Token',
            html:'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/auth/v1/confirmation\/' + token + '.\n'
        }
        await sendmail(mail)
        res.status(200).json({
            success:true,
            message:'Activation email resent Successfully'
        })
    } catch (err){
        console.log(`Error! :${err}`.red.bold)
        return res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}