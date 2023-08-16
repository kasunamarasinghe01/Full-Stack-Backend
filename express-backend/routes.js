const express = require('express');
const routes = express.Router();

const user = require('./routes/user');
const questionnaire = require('./routes/questionnaire');
const answer = require('./routes/answer');

routes.use((req, res, next)=>{
    const apiKye = req.get('API-Key');
    if(!apiKye || apiKye !== process.env.APIKey){
        res.status(401).json({message: 'unauthorised'});
    }
    else{
        next();
    }
});

routes.use('/user', user);
routes.use('/questionnaire', questionnaire);
routes.use('/answer', answer);

module.exports = routes;