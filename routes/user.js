const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res, next) => { //使用passport 認證
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })(req, res, next)
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  User.findOne({ email: email })
    .then(user => {
      if (user) {
        res.render('register', { name, email, password, password2 })
      } else {
        const newUser = new User({ name, email, password })
        newUser.save()
          .then(user => { res.redirect('/') })
          .catch(err => console.log(err))
      }
    })
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})


module.exports = router