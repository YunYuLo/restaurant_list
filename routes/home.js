const express = require('express')
const router = express.Router()
const RestaurantList = require('../models/restaurantList')
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  RestaurantList.find((err, restaurantLists) => {
    if (err) return console.log(err)
    return res.render('index', { restaurants: restaurantLists })
  })
})

module.exports = router