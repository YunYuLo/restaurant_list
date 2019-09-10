const express = require('express')
const router = express.Router()
const RestaurantList = require('../models/restaurantList')
const { authenticated } = require('../config/auth')


router.get('/', authenticated, (req, res) => {
  const sortKey = req.query.sortKey || 'rating';
  const sortOrder = req.query.sortOrder || 'desc';
  const sortObject = {};
  sortObject[sortKey] = sortOrder;

  RestaurantList.find({ userId: req.user._id })
    .sort(sortObject)
    .exec((err, restaurantLists) => {
      if (err) return console.log(err)
      const restaurant = restaurantLists.filter(restaurant => {
        const regex = new RegExp(req.query.keyword, 'gi')
        return restaurant.name_en.match(regex) || restaurant.name.match(regex) || restaurant.category.match(regex)
      })
      return res.render('index', { restaurants: restaurant, keyword: req.query.keyword })
    })
})

module.exports = router