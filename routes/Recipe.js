const express = require('express')
const { getRecipes,postRecipe,getRecipeById} = require('../controllers/Recipe')

const { isAuth } = require('../middlewares/isAuth')
const { isActive } = require('../middlewares/isActive')
const router = express.Router()

router.route('/').get(isAuth,isActive,getRecipes).post(isAuth,postRecipe)
router.route('/:id').get(getRecipeById)
module.exports = router 