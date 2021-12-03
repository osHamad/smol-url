// importing requirements for server
const express = require('express')
const mongoose = require('mongoose')

// setting up environment
require('dotenv').config()
const URI = process.env.URI
const PORT = process.env.PORT

// initializing express application
const app = express()

// use middleware
app.use(express.json())

// set view engine to ejs
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

// get the main page
app.get('/', (req, res)=>{
    res.render('index.ejs')
})

// connecting to database
mongoose.connect(URI, {
    useNewUrlParser: true
})
const db = mongoose.connection

// starting server
db.once('open', ()=>{
    app.listen(PORT, ()=>{
        console.log('listening on port:', PORT)
    })
})
