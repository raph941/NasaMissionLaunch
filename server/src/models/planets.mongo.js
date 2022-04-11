const mongoose = require('mongoose');

const planetSchema = new mongoose.Schema({
    keplerName: {
        type: String,
        required: true,
    }
})

// first parameter would be made lowercase by mongo and pluralised
// i.e it would reference the launches model.
module.exports = mongoose.model('Planet', planetSchema)