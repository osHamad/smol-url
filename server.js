// importing requirements for server
const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const shortenRouter = require('./routes/shortener')
const userRouter = require('./routes/users')

// setting up environment
const dotenv = require('dotenv')
dotenv.config()

const URI = process.env.URI
const PORT = process.env.PORT || 5000
const SESSION_SECRET = process.env.SESSION_SECRET

// initializing express application
const app = express()

// uses
app.use(session(
    {
        name: 'auth',
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: 
        {
            // specify cookie options
            maxAge: 1000 * 60 * 60 * 4  // set to 4 hours
        }
    }
))
app.use(express.json())
app.use('/shorten', shortenRouter)
app.use('/user', userRouter)

// set view engine to ejs
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/static'))

// get the main page
app.get('/', (req, res)=>{
    res.render('index.ejs')
})

app.get('*', (req, res)=>{
    res.send('page not found')
})

mongoose.set('strictQuery', true)

// connecting to database
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', (e)=>{
    console.log('error occured connecting to database')
    console.log(e)
})

// starting server
db.once('open', ()=>{
    console.log('connected to database')
    app.listen(PORT, ()=>{
        console.log('listening on port:', PORT)
    })
})