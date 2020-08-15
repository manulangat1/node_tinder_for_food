const express = require('express')
const { getRecipes,postRecipe} = require('../controllers/Recipe')

const router = express.Router()

router.route('/').get(getRecipes).post(postRecipe)

module.exports = router 