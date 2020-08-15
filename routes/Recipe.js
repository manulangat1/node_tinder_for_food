const express = require('express')
const { getRecipes,postRecipe,getRecipeById} = require('../controllers/Recipe')

const router = express.Router()

router.route('/').get(getRecipes).post(postRecipe)
router.route('/:id').get(getRecipeById)
module.exports = router 