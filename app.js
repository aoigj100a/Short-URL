const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost/URL', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
    console.log('mongoDB error!')
})
db.once('open', () => {
    console.log('mongoDB connected!')
})

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, () => {
    console.log(`已經連線到http://localhost:${port}`)
})