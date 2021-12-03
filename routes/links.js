// get required packages and files
const express = require('express')
const shortLink = require('../models/shortLink.model')

// create express router
const linkRouter = express.Router()

// render main page
linkRouter.get('/', (req, res)=>{
    res.render('index.ejs')
})

// create short schema to send to database
linkRouter.post('/', (req, res)=>{
    const link = new shortLink (
        {
            original: req.body.original,
            short: req.body.short
        }
    )

    // save link to database
    link.save((err)=>{
        if (err) return console.log('500 error:', err)
        res.send('new link added:'+req.body.short)
    })
})

// export the router
module.exports = linkRouter