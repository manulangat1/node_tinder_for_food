const mongoose = require('mongoose')
const Recipe = require('../models/Recipe')


exports.getRecipes = async(req,res) => {
    try{
           
        const recipes = await Recipe.find()
        res.status(200).json({
            success:true,
            data:recipes
        })
    } catch (err){
        console.log(`Error! :${err}`.red.bold)
        return res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}
exports.postRecipe = async (req,res) => {
    try{
        const { desc } = req.body 
        const recipe = new Recipe({
            user:req.user,
            desc:desc
        })
        await recipe.save()
        res.status(201).json({
            success:true,
            data:recipe
        })
    } catch (err){
        console.log(`Error! :${err}`.red.bold)
        return res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}