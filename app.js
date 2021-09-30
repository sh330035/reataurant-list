const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const restaurantsList = require('./restaurant.json')
const restaurants = restaurantsList.results

const port = 3000

// 使用 handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// setting route
app.get('/', (req, res) => {
  res.render('index', { restaurants })
})

app.get('/search/', (req, res) => {
  res.render('index', { restaurants })
})

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
