const express = require('express')
const exphbs = require('express-handlebars')
require('./config/db')
const bodyParser = require('body-parser')
const routes = require('./routes')
const app = express()
const port = process.env.PORT || 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

app.listen(port, () => {
  console.log(`已經連線到http://localhost:${port}`)
})