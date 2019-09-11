// 載入 express-handlebars, body-parser, method-override
const express = require('express')
const app = express()
if (process.env.NODE_ENV !== 'production') {      // 判斷開發環境
  require('dotenv').config()
}
const exphbs = require('express-handlebars')
const port = 3000
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

// 載入 express-session 與 passport
const session = require('express-session')
const passport = require('passport')

// 使用 express-handlebars, body-parser, method-override, express session
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(session({
  secret: "your secret key", // secret: 定義一組屬於你的字串做為私鑰
  resave: false,
  saveUninitialized: true,
}))

//connect to database
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurantList', { useNewUrlParser: true, useCreateIndex: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connected')
})

// 使用 Passport 
app.use(passport.initialize())
app.use(passport.session())

// 載入 Passport config
require('./config/passport')(passport)

// 登入後可以取得使用者的資訊方便我們在 view 裡面直接使用
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  next()
})

//載入 model
const RestaurantList = require('./models/restaurantList')


//routes
app.use('/', require('./routes/home'))
app.use('/restaurants', require('./routes/restaurants'))
app.use('/users', require('./routes/user'))
app.use('/auth', require('./routes/auth'))

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})