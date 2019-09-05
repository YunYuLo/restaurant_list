const express = require('express')
const router = express.Router()
const RestaurantList = require('../models/restaurantList')

router.get('/', (req, res) => {
  RestaurantList.find((err, restaurantLists) => {
    if (err) return console.log(err)
    const restaurant = restaurantLists.filter(restaurant => {
      const regex = new RegExp(req.query.keyword, 'gi')
      return restaurant.name_en.match(regex) || restaurant.name.match(regex) || restaurant.category.match(regex)
    })
    return res.render('index', { restaurants: restaurant, keyword: req.query.keyword })
  })
})

module.exports = router