const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/URL'
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
    console.log('mongoDB error!')
})
db.once('open', () => {
    console.log('mongoDB connected!')
})

module.exports = db 