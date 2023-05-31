const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name: { type: String, require: true},
    Price: { type: Number, require: true}
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item