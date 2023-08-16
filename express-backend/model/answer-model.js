const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    questionnaire: {
        required: true,
        type: String
    },
    answerer: {
        required: true,
        type: String
    },
    answererName: {
        required: true,
        type: String
    },
    marks: {
        required: true,
        type: Number
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('answers', answerSchema)