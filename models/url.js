const mongoose = require('mongoose')
const urlSchema = new mongoose.Schema({
    original: {
        type: String,
        require: true
    },
    tiny: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Url', urlSchema)