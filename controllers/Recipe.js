const mongoose = require('mongoose')
const Recipe = require('../models/Recipe')


exports.getRecipes = async(req,res) => {
    try{
           
        const recipes = await Recipe.find({user:req.user})
        res.status(200).json({
            success:true,
            token:req.token,
            count:recipes.length,
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
            token:req.token,
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

exports.getRecipeById = async(req,res) => {
    try{
        const id = req.params.id 
        const recipe = await Recipe.findById(id)
        if (recipe){
            res.status(200).json({
                success:true,
                token:req.token,
                data:recipe
            })
        } else {
            res.status(404).json({
                success:false,
                message:'Recipe not found'
            })
        }
        
    } catch (err){
        console.log(`Error! :${err}`.red.bold)
        return res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}