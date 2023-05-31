//require('dotenv').config()
const express = require('express')
// const mongoose = require('mongoose')
// const jsxEngine = require('jsx-view-engine')
// const Item = require('./models/item')
const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

// mongoose.connect(process.env.MONGO_URI)
// mongoose.connection.once('open', () => {
//     console.log('connected to mongodb')
// })

let items = []

// I.N.D.U.C.E.S. //

// INDEX - A TABLE OF CONTENTS OF ALL YOUR RESOURCES
app.get('/items', (req, res) => {
    res.json(items)
})


// NEW
// show the user a form to fill out to create


// DELETE
// backend only functionality that is used to delete

// UPDATE
// backend only functionality that is used to update

// CREATE
// backend only functionality that is used to create

// EDIT
// show you a form that lets you edit t

// SHOW
// shows you 1 individual 


app.listen(PORT, () => {
    console.log(`${PORT} initiated!`)
})