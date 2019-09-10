const express = require('express')
const router = express.Router()
const RestaurantList = require('../models/restaurantList')
const { authenticated } = require('../config/auth')



//post a new restaurant
router.get('/new', authenticated, (req, res) => {
  res.render('new')
})

router.post('/', authenticated, (req, res) => {
  const restaurant = new RestaurantList({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    rating: req.body.rating,
    description: req.body.description,
    userId: req.user._id
  })
  restaurant.save((err) => {
    if (err) return console.log(err)
    return res.redirect('/')
  })
})

//show more details 
router.get('/:id', authenticated, (req, res) => {
  RestaurantList.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.log(err)
    return res.render('show', { restaurants: restaurant })
  })
})

//show edit page
router.get('/:id/edit', authenticated, (req, res) => {
  RestaurantList.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.log(err)
    return res.render('edit', { restaurants: restaurant })
  })
})

//edit details of exist data
router.put('/:id/edit', authenticated, (req, res) => {
  RestaurantList.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.log(err)
    restaurant.name = req.body.name
    restaurant.name_en = req.body.name_en
    restaurant.category = req.body.category
    restaurant.image = req.body.image
    restaurant.location = req.body.location
    restaurant.phone = req.body.phone
    restaurant.rating = req.body.rating
    restaurant.description = req.body.description

    restaurant.save((err) => {
      return res.redirect(`/restaurants/${req.params.id}`)
    })
  })
})

//delete data
router.delete('/:id/delete', authenticated, (req, res) => {
  RestaurantList.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    restaurant.remove((err) => {
      return res.redirect('/')
    })
  })
})

module.exports = router