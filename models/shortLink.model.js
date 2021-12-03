// importing mongoose
const mongoose = require('mongoose')

// create schema for short links
const Schema = mongoose.Schema
const shortSchema = new Schema (
    {
        original: {
            type: String,
            required: true
        },

        short: {
            type: String,
            required: true,
            unique: true
        }
    }
)

// export the shortened link schema
const shortLink = mongoose.model('shortLink', shortSchema)
module.exports = shortLink