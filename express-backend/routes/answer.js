const express = require('express');
const answer = express.Router();
const AnswerModel = require('../model/answer-model');

answer.post('/create', async (req, res)=>{

    try{

        const data = new AnswerModel({
            questionnaire: req.body.questionnaire,
            answerer: req.body.answerer,
            answererName: req.body.answererName,
            marks: req.body.marks,
        });

        const dataToSave = await data.save();
        res.status(200).json({id: dataToSave.id});
    }
    catch(error){
        res.status(400).json({ message: error.message });
    }
});

module.exports = answer;