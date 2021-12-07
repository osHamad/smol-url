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
    newHost = req.protocol + '://' + req.get('host')
    res.redirect(newHost+'/shorten')
})

// find short link in database then redirect to original
app.get('/:short', async (req, res)=>{
    if (req.params.short === 'favicon.ico') return
    original = await link.findOne(
        { short: req.params.short }
    )
    if (original===null){
        res.send('not a valud link')
    }
    res.redirect(302, 'https://'+original['original'])
})

app.get('*', (req, res)=>{
    res.send('page not found')
})

// connecting to database
mongoose.connect(URI, {
    useNewUrlParser: true
})
const db = mongoose.connection

db.on('error', ()=>{
    console.log('error occured connecting to database')
})

// starting server
db.once('open', ()=>{
    console.log('connected to database')
    app.listen(PORT, ()=>{
        console.log('listening on port:', PORT)
    })
})
