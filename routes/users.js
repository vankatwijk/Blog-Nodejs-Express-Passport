const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
    res.render('Auth/login.ejs')
})

router.get('/register', (req, res) => {
    res.render('Auth/register.ejs')
})


module.exports = router