const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000
const bodyParser = require('body-parser')
const restaurantList = require('./restaurant.json')


//connect to database
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurantList', { useNewUrlParser: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connected')
})

const RestaurantList = require('./models/restaurantList')

//template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

//routes
// show all restaurant
app.get('/', (req, res) => {
  RestaurantList.find((err, restaurantLists) => {
    if (err) return console.log(err)
    return res.render('index', { restaurants: restaurantLists })
  })
})

app.get('/restaurants', (req, res) => {
  return res.redirect('/')
})


//post a new restaurant
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

app.post('/restaurants', (req, res) => {
  const restaurant = new RestaurantList({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    rating: req.body.rating,
    description: req.body.description,
  })
  restaurant.save((err) => {
    if (err) return console.log(err)
    return res.redirect('/')
  })
})

//show more details 
app.get('/restaurants/:id', (req, res) => {
  RestaurantList.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log(err)
    return res.render('show', { restaurants: restaurant })
  })
})

//show edit page
app.get('/restaurants/:id/edit', (req, res) => {
  RestaurantList.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log(err)
    return res.render('edit', { restaurants: restaurant })
  })
})

//edit details of exist data
app.post('/restaurants/:id/edit', (req, res) => {
  RestaurantList.findById(req.params.id, (err, restaurant) => {
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
app.post('/restaurants/:id/delete', (req, res) => {
  RestaurantList.findById(req.params.id, (err, restaurant) => {
    restaurant.remove((err) => {
      return res.redirect('/')
    })
  })
})

//searching
app.get('/search', (req, res) => {
  RestaurantList.find((err, restaurantLists) => {
    if (err) return console.log(err)
    const restaurant = restaurantLists.filter(restaurant => {
      const regex = new RegExp(req.query.keyword, 'gi')
      return restaurant.name_en.match(regex) || restaurant.name.match(regex) || restaurant.category.match(regex)
    })
    return res.render('index', { restaurants: restaurant, keyword: req.query.keyword })
  })
})

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})