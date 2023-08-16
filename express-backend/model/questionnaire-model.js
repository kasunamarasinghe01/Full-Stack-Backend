const mongoose = require('mongoose');

const questionnaireSchema = new mongoose.Schema({

    title: {
        required: true,
        type: String
    },
    owner: {
        required: true,
        type: String
    },

    question1: {
        required: true,
        type: String
    },
    q1a: {
        required: true,
        type: String
    },
    q1w1: {
        required: true,
        type: String
    },
    q1w2: {
        required: true,
        type: String
    },
    q1w3: {
        required: true,
        type: String
    },

    question2: {
        required: true,
        type: String
    },
    q2a: {
        required: true,
        type: String
    },
    q2w1: {
        required: true,
        type: String
    },
    q2w2: {
        required: true,
        type: String
    },
    q2w3: {
        required: true,
        type: String
    },

    question3: {
        required: true,
        type: String
    },
    q3a: {
        required: true,
        type: String
    },
    q3w1: {
        required: true,
        type: String
    },
    q3w2: {
        required: true,
        type: String
    },
    q3w3: {
        required: true,
        type: String
    },

    question4: {
        required: true,
        type: String
    },
    q4a: {
        required: true,
        type: String
    },
    q4w1: {
        required: true,
        type: String
    },
    q4w2: {
        required: true,
        type: String
    },
    q4w3: {
        required: true,
        type: String
    },

    question5: {
        required: true,
        type: String
    },
    q5a: {
        required: true,
        type: String
    },
    q5w1: {
        required: true,
        type: String
    },
    q5w2: {
        required: true,
        type: String
    },
    q5w3: {
        required: true,
        type: String
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('questionnaires', questionnaireSchema)