// importing mongoose
const mongoose = require('mongoose')

// create schema for short links
const Schema = mongoose.Schema
const shortSchema = new Schema (
    {
        url: {
            type: String,
            required: true
        },

        short: {
            type: String,
            required: true,
            unique: true
        },

        userID: {
            type: String,
            default: null
        },

        dateCreated: {
            type: Date,
            required: true
        },

        tier: {
            type: String,
            default: "basic"
        },

        expiry: {
            type: Date,
            default: null
        },

        security: {
            question: {
                type: String
            },

            answer: {
                type: String
            }
        },

        clicks: {
            amount: {
                type: Number,
                default: 0
            },

            locations: {
                type: Array,
            },

            dates: {
                type: Array,
            }
        }

    }
)

// export the shortened link schema
const shortLink = mongoose.model('shortLink', shortSchema)
module.exports = shortLink