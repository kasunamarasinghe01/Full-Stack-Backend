const express = require('express');
const questionnaire = express.Router();
const QuestionnaireModel = require('../model/questionnaire-model');

questionnaire.post('/create', async (req, res)=>{

    try{

        const requestBody = req.body;

        const data = new QuestionnaireModel({
            title: requestBody.title,
            owner: requestBody.owner,

            question1: requestBody.question1,
            q1a: requestBody.q1a,
            q1w1: requestBody.q1w1,
            q1w2: requestBody.q1w2,
            q1w3: requestBody.q1w3,

            question2: requestBody.question2,
            q2a: requestBody.q2a,
            q2w1: requestBody.q2w1,
            q2w2: requestBody.q2w2,
            q2w3: requestBody.q2w3,

            question3: requestBody.question3,
            q3a: requestBody.q3a,
            q3w1: requestBody.q3w1,
            q3w2: requestBody.q3w2,
            q3w3: requestBody.q3w3,

            question4: requestBody.question4,
            q4a: requestBody.q4a,
            q4w1: requestBody.q4w1,
            q4w2: requestBody.q4w2,
            q4w3: requestBody.q4w3,

            question5: requestBody.question5,
            q5a: requestBody.q5a,
            q5w1: requestBody.q5w1,
            q5w2: requestBody.q5w2,
            q5w3: requestBody.q5w3,
        });
    
        const dataToSave = await data.save();
        res.status(200).json({id: dataToSave.id});

    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

questionnaire.get("/all/:uid", async (req,res)=>{

    try{
        const data = await QuestionnaireModel.find({owner : req.params.uid}).sort({ _id: -1 });
        
        var selectedData = [];

        data.forEach((index)=>{
            selectedData.push({id: index.id, title: index.title});
        });

        res.status(200).json(selectedData);
    }
    catch{
        res.status(400).json({ message: error.message });
    }
    
});

questionnaire.get("/:id", async (req,res)=>{

    try{
        const data = await QuestionnaireModel.find({_id : req.params.id});

        res.status(200).json(data[0]);
    }
    catch(error){
        res.status(400).json({ message: error.message });
    }
    
});

module.exports = questionnaire;