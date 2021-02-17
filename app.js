const express = require('express')
const exphbs = require('express-handlebars')
require('./config/db')

const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))



app.get('/', (req, res) => {
    res.render('index')
})
app.post('/',(req, res)=>{
    console.log(req.body)
    res.send('收表單囉')
})

app.listen(port, () => {
    console.log(`已經連線到http://localhost:${port}`)
})