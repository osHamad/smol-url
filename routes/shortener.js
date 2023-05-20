// get required packages and files
const express = require('express')
const shortLink = require('../models/shortLink.model')

// create express router
const shortenRouter = express.Router()

function validURL(str) {
    var pattern = new RegExp(
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i') // fragment locator
    return pattern.test(str)
}

// create short schema to send to database
shortenRouter.post('/basic', (req, res) => {
    console.log(req.session.userId)
    if (!validURL(req.body.url)) {
        res.send({status: "fail", message: "invalid link"})
    } else {
        let newURL = ''
        chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
        for (let i = 0; i < 5; i++) {
            newURL += chars.charAt(Math.random() * 62)
        }

        const link = new shortLink (
            {
                url: req.body.url,
                short: newURL,
                userID: req.session.userId,
                dateCreated: new Date(),
                tier: "basic"
            }
        )

        // save link to database
        link.save((err)=>{
            if (err) return console.log('500 error:', err)
            res.send({url: 'https://smolr.onrender.com' + newURL, status: "success"})
        })
    }
})


shortenRouter.post('/secure', (req, res)=>{
    if (!validURL(req.body.url)) {
        res.send({status: "fail", message: "invalid link"})
    } else {
        let newURL = ''
        chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
        for (let i = 0; i < 5; i++) {
            newURL += chars.charAt(Math.random() * 62)
        }

        const link = new shortLink (
            {
                url: req.body.url,
                short: newURL,
                userID: req.session.userId,
                dateCreated: new Date(),
                tier: "secure",
                'security.question': req.body.question,
                'security.answer': req.body.answer
            }
        )

        // save link to database
        link.save((err)=>{
            if (err) return console.log('500 error:', err)
            res.send({url: 'https://smolr.onrender.com' + newURL, status: "success"})
        })
    }
})


shortenRouter.post('/custom', async (req, res)=>{
    const existingLink = await shortLink.find({short: req.body.short})
    if (!validURL(req.body.url)) {
        res.send({status: "fail", message: "invalid link"})
    } else if (existingLink) {
        res.send({status: "fail", message: "link is taken"})
    } else {

        const link = new shortLink (
            {
                url: req.body.url,
                short: req.body.short,
                userID: req.session.userId,
                dateCreated: new Date(),
                tier: 'custom',
            }
        )

        // save link to database
        link.save((err)=>{
            if (err) return console.log('500 error:', err)
            res.send({url: 'https://smolr.onrender.com' + req.body.short, status: "success"})
        })
    }
})

// export the router
module.exports = shortenRouter