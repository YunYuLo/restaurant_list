const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const { authenticated } = require('../config/auth')


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
  const emailPattern = new RegExp('^\w{1,63}@[a-zA-Z0-9]{2,63}\.[a-zA-Z]{2,63}(\.[a-zA-Z]{2,63})?$')

  let errors = []
  if (!email || !password || !password2) {
    errors.push({ message: 'Email, Password 及 Confirm Password為必填欄位' })
  }
  if (!email.match(emailPattern)) {
    errors.push({ message: 'Email格式有誤' })
  }
  if (password != password2) {
    errors.push({ message: '密碼輸入錯誤！' })
  }


  if (errors.length > 0) {
    res.render('register', ({ errors, name, email, password, password2 }))
  } else {
    User.findOne({ email: email })
      .then(user => {
        if (user) {
          errors.push({ message: '這個 Email 已經註冊過了' })
          res.render('register', { errors, name, email, password, password2 })
        } else {
          const newUser = new User({ name, email, password })

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err
              newUser.password = hash

              newUser.save()
                .then(user => { res.redirect('/') })
                .catch(err => console.log(err))

            })
          })

        }
      })
  }


})

router.get('/editProfile', authenticated, (req, res) => {
  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err) throw err
    return res.render('editProfile', { name: user.name, email: user.email })
  })
})

router.put('/editProfile', authenticated, (req, res) => {
  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err) return console.log(err)

    let errors = []
    if (!req.body.password || !req.body.password2) {
      errors.push({ message: 'Password 及 Confirm Password為必填欄位' })
    }
    if (req.body.password != req.body.password2) {
      errors.push({ message: '密碼輸入錯誤！' })
    }

    if (errors.length > 0) {
      res.render('editProfile', ({ errors, name: user.name, email: user.email }))
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) throw err
          user.password = hash
          user.name = req.body.name

          user.save()
            .then(user => {
              req.flash('success_msg', '你已成功修改')
              res.redirect('/users/editProfile')
            })
            .catch(err => console.log(err))

        })
      })

    }
  })
})


router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出')
  res.redirect('/users/login')
})


module.exports = router