// importing requirements for server
const express = require('express')
const mongoose = require('mongoose')
const shortLink = require('./models/shortLink.model')

// setting up environment
const dotenv = require('dotenv')
dotenv.config()

const URI = process.env.URI
const PORT = process.env.PORT || 2222

// initializing express application
const app = express()

// uses
app.use(express.json())

// set view engine to ejs
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/static'))

// get the main page
app.get('/', (req, res)=>{
    res.send('hello world')
})

// find short link in database then redirect to original
app.get('/:short', async (req, res)=>{
    original = await shortLink.findOne({ short: req.params.short })
    try {
        if (original == null) {
            res.render('errors/404')
            res.end()
        } else {
            original['clicks']['amount']++
            original['clicks']['dates'].push(new Date())
            original.save()
            if (original['tier'] == 'secure') {
                res.render('securelink.ejs', {question:original['security']['question']})
            }
            else if (original['url'].startsWith('https://') || original['url'].startsWith('http://')) {
                res.redirect(original['url'])
            } else {
                res.redirect('http://'+original['url'])
            }
        }
        
    } catch (e) {
        console.log(e)
    }
})

// find short link in database then redirect to original
app.post('/:short/securepass', async (req, res)=>{
    original = await shortLink.findOne({ short: req.params.short })
    if (original['security']['answer'] != req.body.answer) {
        res.send({status: 'fail', message: 'wrong answer'})
    }
    else if (original['url'].startsWith('https://') || original['url'].startsWith('http://')) {
        res.send({status: 'success', url: original['url']})
    } else {
        res.send({status: 'success', url: 'http://' + original['url']})
    }
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