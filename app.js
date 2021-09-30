// include modules
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

// include restaurants data from JSON
const restaurantsList = require('./restaurant.json')
const restaurants = restaurantsList.results

// port variation
const port = 3000

// 使用 handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// setting route
// 首頁 route
app.get('/', (req, res) => {
  res.render('index', { restaurants })
})

// search route
app.get('/search', (req, res) => {
  const keywords = req.query.keywords
  const restaurantSearch = restaurants.filter((restaurant) => {
    // 可從名字、英文名字、種類、描述來搜尋餐廳
    if (
      restaurant.name.toLowerCase().includes(keywords.toLowerCase()) ||
      restaurant.name_en.toLowerCase().includes(keywords.toLowerCase()) ||
      restaurant.category.includes(keywords) ||
      restaurant.description.toLowerCase().includes(keywords.toLowerCase())
    )
      return restaurant
  })
  res.render('index', { restaurants: restaurantSearch, keywords })
})

// show route
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurantId = req.params.restaurant_id
  const restaurant = restaurants.find(
    (restaurant) => restaurant.id.toString() === restaurantId
  )
  res.render('show', { restaurant })
})

// setting server
app.listen(port, () => {
  console.log(`Express running on the port ${port}`)
})
