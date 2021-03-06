// get required packages and files
const express = require('express')
const shortLink = require('../models/shortLink.model')

// create express router
const linkRouter = express.Router()

// find short link in database then redirect to original
linkRouter.get('/:short', async (req, res)=>{
    original = await shortLink.findOne({ short: req.params.short })
    if (original['original'].startsWith('https://') || original['original'].startsWith('http://')) {
        res.redirect(original['original'])
    } else {
        res.redirect('http://'+original['original'])
    }
})

// export the router
module.exports = linkRouter
