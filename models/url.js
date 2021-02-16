const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        require: true
    },
    fit: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Url', urlSchema)