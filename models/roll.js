const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let rollSchema = new Schema({
    name: {
        type: String,
        required: [true, "The name its required!"]
    },
    description: {
        type: String,
        required: [true, "The name its required!"]
    },
    state: {
        type: Boolean,
        default: true
    }
});


module.exports = mongoose.model('Roll', rollSchema);