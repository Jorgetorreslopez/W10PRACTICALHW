require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
// const jsxEngine = require('jsx-view-engine')
const Item = require('./models/item')
const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
mongoose.connection.once('open', () => {
    console.log('mongo!')
})

let items = []

app.get('/items', (req, res) => {
    res.json(items)
})

app.post('/items', (req, res) => {
    const { name, price } = req.body
    const newItem = new Item({
        name,
        price
    })
    newItem.save()
    .then((savedItem) => {
      res.status(201).json(savedItem);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to add item' });
    });
})

app.listen(PORT, () => {
    console.log(`Andre ${PORT} da Goat!`)
})
