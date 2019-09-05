const express = require('express')
const router = express.Router()
const RestaurantList = require('../models/restaurantList')

router.get('/', (req, res) => {
  RestaurantList.find((err, restaurantLists) => {
    if (err) return console.log(err)
    return res.render('index', { restaurants: restaurantLists })
  })
})

module.exports = router