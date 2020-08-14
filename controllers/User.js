const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Token = require('../models/Token')
const  { sendmail} = require('../utils/mailer')
const generateAuthToken = async (user) => {
    // console.log(user)
    try{
        // console.log(user)
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
            // user.tokens = user.tokens.concat({token})
            // token.tokens = token.tokens.concat({tokena})
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
            res.status(404).json({
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
exports.confirmToken = async(res,req) => {
    try{
        const token = req.params.token
        console.log(token)
        const token_ = await Token.findOne({token})
        if (!token){
            res.status(400).json({
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
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}