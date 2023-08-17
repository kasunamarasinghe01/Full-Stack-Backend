const express = require('express');
const user = express.Router();

const UserModel = require('../model/user-model');
const password = require('../services/password');


user.post('/create', async (req, res) => {

    try{
        const data = await UserModel.find({email : req.body.email});

        if(data.length > 0){
            res.status(900).json({ message: 'Already have an account!' });
            return;
        }

        password.cryptPassword(req.body.password, async function(err, hash) {

            const data = new UserModel({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
            });
        
            const dataToSave = await data.save(); 
            res.status(200).json({uid: dataToSave.id});
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }

});

user.post('/login', async(req, res)=>{
    try{
        const data = await UserModel.find({email : req.body.email});
        
        if(data.length === 0){
            res.status(401).json({message: 'Login failed!'});
            return;
        }

        password.comparePassword(req.body.password, data[0]['password'], async function(err, isPasswordMatch) {

            if(!isPasswordMatch){
                res.status(401).json({message: 'Login failed!'});
                return;
            }

            res.status(200).json({ uid : data[0]['id']});
        });
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

user.get('/name/:uid', async(req, res)=>{

    try{
        const data = await UserModel.find({_id : req.params.uid});

        res.status(200).json({firstName: data[0]['firstName'], lastName: data[0]['lastName']});
    }
    catch(error){
        res.status(400).json({ message: error.message });
    }
});

module.exports = user;