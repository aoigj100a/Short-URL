const express = require('express')
const exphbs = require('express-handlebars')
require('./config/db')
const bodyParser = require('body-parser')
const Url = require('./models/url')
const randomFiveString =require('./randomFiveString')

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
    // console.log(req.body)
    const originalUrl = req.body.url
    Url.find().lean()
    .then((urls)=>{
        //待部署後更正
        let host = `http://localhost:${port}/`
        //確認資料庫內是否有此筆資料
        const shortenedUrl = urls.find((url) => url.originalUrl === originalUrl)
        if (shortenedUrl) {
          const url = host + shortenedUrl.fit
          //有資料就直接中斷 回傳結果！
          return res.render('result', { url })
        }
        //沒有重複之後 就產生一組隨機長度5的字串
        let fit = randomFiveString()
        //新增到資料庫
        Url.create({
            originalUrl: originalUrl,
            fit: fit
          }).then(() => {
            const shortenedUrl = host + fit
            //去view把傳過去的資料印出
            res.render('result', { shortenedUrl })
          })
          .catch(error => console.log(error))
    })

    app.get('/:fit',(req,res)=>{
        const fit = req.params.fit
        res.send(`等一下要轉往原始網址${fit}`)
    })
    
    
})

app.listen(port, () => {
    console.log(`已經連線到http://localhost:${port}`)
})