const mongoose = require('mongoose')
const urllist = require('./urls.json').urls
const Url = require('../url')
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost/URL', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.once('open', () => {
    console.log('mongodb connected !!')
    Url.create(urllist)
      .then(() => db.close())
    console.log('url is done')
  })