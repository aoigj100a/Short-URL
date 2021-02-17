const urllist = require('./urls.json').urls
const Url = require('../url')

const db = require('../../config/db')
db.once('open', () => {
    console.log('mongodb connected !!')
    Url.create(urllist)
      .then(() => db.close())
    console.log('url is done')
  })