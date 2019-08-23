const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000
const restaurantList = require('./restaurant.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantList.results.filter(restaurant => restaurant.id == req.params.id)
  res.render('show', { restaurants: restaurant[0] })
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