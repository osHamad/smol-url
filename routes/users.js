// get required packages and files
const express = require('express')
const users = require('../models/users.model')
const shortLink = require('../models/shortLink.model')

// create express router
const userRouter = express.Router()

function isLoggedIn(req, res, next) {
    if (req.session.userId == null) {
        return res.redirect('/user/login')
    }
    next()
}

// create short schema to send to database
userRouter.get('/', isLoggedIn, async (req, res)=>{
    try {
        const user = await users.findOne({_id: req.session.userId})
        const links = await shortLink.find({userID: req.session.userId})
        res.send(user.name.first + user.name.last + links)
    } catch(e) {
        console.log(e)
    }
})

userRouter.get('/signup', (req, res)=>{
    res.render('signup')
})

userRouter.get('/login', (req, res)=>{
    res.render('login')
})

userRouter.post('/new', (req, res)=>{
    const newUser = new users(
        {
            name: {first: req.body.firstname, last: req.body.lastname},
            email: req.body.email,
            password: req.body.firstpass
        }
    )

    newUser.save((e) => {
        if (e) {console.log(e)}
        res.send({status: 'success', message: 'new user created'})
    })
})

userRouter.post('/login', async (req, res)=>{
    const user = await users.findOne({email: req.body.email})

    if (user == null) {
        res.send({status: 'fail', message: 'not registered'})
    } else if (req.body.password == user.password) {
        req.session.userId = user._id
        res.send({status: 'success', message: '/user'})
    } else {
        res.send({status: 'fail', message: 'wrong password'})
    }
    
})

// export the router
module.exports = userRouter