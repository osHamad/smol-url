// importing requirements for server
const express = require('express')
const mongoose = require('mongoose')
const linkRouter = require('./routes/links')
const link = require('./models/shortLink.model')

// setting up environment
require('dotenv').config()
const URI = process.env.URI
const PORT = process.env.PORT || 5000

// initializing express application
const app = express()

// uses
app.use(express.json())
app.use('/shorten', linkRouter)

// set view engine to ejs
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/static'))

// get the main page
app.get('/', (req, res)=>{
    res.redirect('http://localhost:5000/shorten')
})

// find short link in database then redirect to original
app.get('/:short', async (req, res)=>{
    original = await link.findOne(
        { short: req.params.short }
    )
    res.redirect(original['original'])
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
