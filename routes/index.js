const express = require('express')
const router = express.Router()
const randomFiveString = require('../randomFiveString')
const Url = require('../models/url')
const port = process.env.PORT || 3000

router.get('/', (req, res) => {
    res.render('index')
})
router.post('/', (req, res) => {
    //如果使用者沒有輸入內容 在這裡擋住
    if (req.body.url === "" || req.body.url === 'undefined') {
        let shortenedUrl = '請輸入網址！！！'
        return res.render('index', { shortenedUrl })
    }
    const originalUrl = req.body.url
    Url.find().lean()
        .then((urls) => {
            let host = ''
            if (process.env.MONGODB_URI) {
                HOST = 'https://secure-retreat-76468.herokuapp.com/'
            } else {
                HOST = 'http://localhost:3000/'
            }
            //確認資料庫內是否有此筆資料
            shortenedUrl = urls.find((url) => url.originalUrl === originalUrl)
            if (shortenedUrl) {
                const url = host + shortenedUrl.fit
                //有資料就直接中斷 回傳結果！
                return res.render('result', { shortenedUrl: url })
            }
            let fit = randomFiveString()
            //避免短網址字串重複 我比起while更喜歡for 原因是因為較不易出現無限迴圈
            //雖然要寫比較多code 但我還是想要掌握整個狀況
            for (i = 0; i < fit.length; i++) {
                //arr.some() 將會回傳布林值
                //重複的話就悄悄的更新fit不讓使用者發現
                urls.some((url) => url.fit === fit) ? fit = randomFiveString() : console.log(`檢查第fit的${i}個字元：無重複`)
            }
            console.log(`fit:${fit} 檢查結束`)

            shortenedUrl = host + fit
            //新增到資料庫
            Url.create({
                originalUrl: originalUrl,
                fit: fit
            }).then(() => {
                //去view把傳過去的資料印出
                res.render('result', { shortenedUrl })
            })
                .catch(error => console.log(error))
        })

    router.get('/:fit', (req, res) => {
        const fit = req.params.fit
        Url.find({ fit: fit }).lean()
            .then((url) => {
                //HTTP 301 重定向回應碼代表所請求的資源已經被移動到所指示的 URL
                res.status(301).redirect(url[0].originalUrl)
            }).catch(error => console.log(error))
    })
})

module.exports = router