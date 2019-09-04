const mongoose = require('mongoose')
const RestaurantList = require('../restaurantList')
const restaurantJson = require('./restaurant.json')

mongoose.connect('mongodb://127.0.0.1/restaurantList', { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})

db.once('open', () => {
  console.log('db connected')

  RestaurantList.create(restaurantJson.results)

  console.log('done!')
})