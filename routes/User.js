const express = require('express')
const {registerUser,loginUser, confirmToken, loadUser , logOutUser} = require('../controllers/User')
const { isAuth } = require('../middlewares/isAuth')
const { isActive } = require('../middlewares/isActive')
const router = express.Router()

router.route('/').post(registerUser)
router.route('/login/').post(loginUser)
router.route('/user/').get( isAuth, loadUser)
router.route('/logout/').post( isAuth, logOutUser)
router.route('/confirmation/:token').get(confirmToken)

module.exports = router 