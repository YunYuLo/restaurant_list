const express = require('express')
const router = express.Router()
const RestaurantList = require('../models/restaurantList')
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  const keyword = req.query.keyword
  const sortKey = req.query.sortKey || 'rating'
  const sortOrder = req.query.sortOrder || 'desc'
  const regex = new RegExp(req.query.keyword, 'gi')
  const sortObject = {};
  sortObject[sortKey] = sortOrder

  RestaurantList.find({
    userId: req.user._id,
    $or: [{
      name: {
        $regex: regex
      }
    }, {
      name_en: {
        $regex: regex
      }
    }, {
      category: {
        $regex: regex
      }
    }],
  })
    .sort(sortObject)
    .exec((err, restaurantLists) => {
      if (err) return console.log(err)
      return res.render('index', { restaurants: restaurantLists, keyword, sortKey, sortOrder })
    })
})

module.exports = router