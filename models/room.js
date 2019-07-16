const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let roomSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name must be assigned']
    },
    description: {
        type: String,
        required: [true, 'The desciption must be assigned']
    },
    state: {
        type: Boolean,
        default: true
    }
});

roomSchema.plugin(uniqueValidator, {
    message: '{PATH} it must be unique!'
});


module.exports = mongoose.model('Room', roomSchema);