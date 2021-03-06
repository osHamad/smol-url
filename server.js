// importing requirements for server
const express = require('express')
const mongoose = require('mongoose')
const shortenRouter = require('./routes/shortener')
const linkRouter = require('./routes/links')

// setting up environment
const dotenv = require('dotenv')
dotenv.config()

const URI = process.env.URI
const PORT = process.env.PORT || 5000

// initializing express application
const app = express()

// uses
app.use(express.json())
app.use('/shorten', shortenRouter)
app.use('/l', linkRouter)

// set view engine to ejs
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/static'))

// get the main page
app.get('/', (req, res)=>{
    res.redirect('/shorten')
})

app.get('*', (req, res)=>{
    res.send('page not found')
})

// connecting to database
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
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
