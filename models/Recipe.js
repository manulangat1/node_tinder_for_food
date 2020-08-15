const mongoose = require('mongoose')


const RecipeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    desc:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        required:true
    }
})

module.exports = mongoose.model('Recipe',RecipeSchema)