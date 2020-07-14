const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const passport = require('passport')
const session = require('express-session')

const initializePassport = require('../passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

const users = []

router.get('/profile', checkAuthenticated, (req, res) => {
    res.render('Auth/login.ejs')
})


router.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('Auth/login.ejs')
})

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/Auth/login',
    failureFlash: true
}))

router.get('/register', (req, res) => {
    res.render('Auth/register.ejs')
})

router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
        id: Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
        })
        res.redirect('login')
    } catch {
        res.redirect('register')
    }

})

router.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/')
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/Auth/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}


module.exports = router