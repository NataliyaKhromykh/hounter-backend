const mongoose = require('mongoose');

const questionsSchema = new mongoose.Schema({
    name: {
        type: String,
        requires: true
    }
})

module.exports = mongoose.model('Question', questionsSchema);