require('./config/config')
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(require('./routes/index'));
// DB config


mongoose.connect('mongodb://localhost:27017/sga2', {
    useNewUrlParser: true
}, (err, res) => {
    if (err) throw error;
    console.log(`Mongo is working ${6 +7}`);
});



// Port 
app.listen(process.env.PORT, () => {
    // console.log("NODEJS LISTENING ", process.env.PORT);    
    console.log("NODEJS WORKING");
});