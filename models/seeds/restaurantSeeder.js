const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
//Models
const RestaurantList = require('../restaurantList')
const User = require('../user')
//Seed data
const restaurantJson = require('./restaurant.json').results
const userJson = require('./user.json').results

mongoose.connect('mongodb://127.0.0.1/restaurantList', { useNewUrlParser: true, useCreateIndex: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})

db.once('open', () => {
  console.log('db connected')


  for (let i = 0; i < userJson.length; i++) {
    //create user
    const user = User(userJson[i])
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        user.save()
          .then()
          .catch(err => { console.log(err) })
      })
    })

    //map 1 user(index: i) with 3 restaurants(index: j)
    for (let j = i * 3; j < (i + 1) * 3; j++) {
      RestaurantList.create({
        ...restaurantJson[j],
        userId: user._id,
      })

      if (j === restaurantJson.length) return
    }
  }

  console.log('done!')
})