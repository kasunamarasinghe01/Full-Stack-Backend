require('dotenv').config();
const mongoose = require("mongoose");
const cors = require("cors");

const port = process.env.PORT || 3000;
const dbURL = "mongodb+srv://kasun_anyq:kasun_anyq@cluster0.zl75ven.mongodb.net/Any_Q";
const app = require("./app");
const routes = require("./routes");

let bodyParser = require('body-parser');

const AnswerModel = require('./model/answer-model');

mongoose.connect(dbURL)
.then(() => {

    const server = app.listen(3000, ()=>{
        console.log("DB connected", port);
    });

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors());

    // SOCKET.IO
    const io = require('socket.io')(server,{
        pingTimeout: 60000,
        cors: {
            origin: "http://localhost:4200",
        },
    });

    io.on('connection', (socket) => {
        console.log('socket connected');

        socket.on('questionnaire', async (qData) => {
            socket.join(qData.id);

            const data = await AnswerModel.find({ questionnaire: qData.id }).sort({ marks: -1 });
            socket.emit('questionnaire', data);

            changeStream = AnswerModel.watch();
            changeStream.on('change', async next =>{
                const data = await AnswerModel.find({ questionnaire: qData.id }).sort({ marks: -1 });
                socket.emit('questionnaire', data);
            });

        });

    });
    
    app.use((req, res, next)=>{
        const apiKye = req.get('API-Key');
        if(!apiKye || apiKye !== process.env.APIKey){
            res.status(401).json({message: 'unauthorised'});
        }
        else{
            next();
        }
    });
 
    app.use('/api', routes);
});