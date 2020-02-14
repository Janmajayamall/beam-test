import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import mongoose from 'mongoose'

import dbConfig from './config/db.config'

const app = express();

app.use(cors());

//parsing all the requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Connected to the database");    
}).catch(err => {
    console.log('Error', err);
    process.exit();
});

app.get('/', (req, res)=>{
    res.send('Welcome')
});

require('./app/routes/scooters.routes')(app);


app.listen(5000, () => {
    console.log("Listening on port 5000");
});