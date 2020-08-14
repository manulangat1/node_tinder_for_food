const express = require('express')
const {registerUser,loginUser, confirmToken} = require('../controllers/User')

const router = express.Router()

router.route('/').post(registerUser)
router.route('/login/').post(loginUser)
router.route('/confirmation/:token').get(confirmToken)

module.exports = router 