// importing mongoose
const mongoose = require('mongoose')

// create schema for short links
const Schema = mongoose.Schema
const userSchema = new Schema (
    {
        name: {
            first: {
                type: String,
                required: true
            },

            last: {
                type: String,
                required: true
            }
        },

        email: {
            type: String,
            required: true
        },

        password: {
            type: String,
            required: true
        }
    }
)

// export the shortened link schema
const user = mongoose.model('user', userSchema)
module.exports = user