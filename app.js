const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000
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

app.use(express.static('public'))

//routes
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id == req.params.id)
  res.render('show', { restaurants: restaurant })
})

app.get('/search', (req, res) => {
  const restaurant = restaurantList.results.filter(restaurant => {
    const regex = new RegExp(req.query.keyword, 'gi')
    return restaurant.name_en.match(regex) || restaurant.name.match(regex) || restaurant.category.match(regex)
  })
  res.render('index', { restaurants: restaurant, keyword: req.query.keyword })
})

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})