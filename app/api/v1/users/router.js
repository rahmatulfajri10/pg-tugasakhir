const express = require('express')
const router = express.Router()
const userController = require('../../../service/pg/user')
const Auth = require('../../../middlewares/auth')
const {  login,
    logout,
    register,
    verify} = require('./controller');

router.post('/register', register)

router.post('/login', login)

router.post('/logout', Auth.verifyToken, logout)

router.post('/verify', Auth.verifyToken, verify)

module.exports = router

