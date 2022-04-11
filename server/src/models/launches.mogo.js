const mongoose = require('mongoose')

const launchesSchema = new mongoose.Schema({
    flightNumber: {
        // Has a lot of properties that can be added here
        type: Number,
        required: true
    },
    launchDate: {
        type: Date,
        required: true
    },
    rocket: {
        type: String,
        required: true,
    },
    target: {
        type: String,
        required: true,
    },
    upcoming: {
        type: Boolean,
        required: true,
        default: true
    },
    customers: [ String ],
})

module.exports = mongoose.model('Launch', launchesSchema)