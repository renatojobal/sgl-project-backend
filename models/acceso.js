const mongoose = require('mongoose')
let Schema = mongoose.Schema;
let typeAccess = {
    values: ['ENTRY', 'EXIT'],
    message: '{VALUE} is invalid!'
}

let AccesoSchema = new Schema({
    date: String,
    hour: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Its required']
    },
    sala: {
        type: Schema.Types.ObjectId,
        ref: 'Sala',
        required: [true, 'Its required']
    },
    typeAccess: {
        type: String,
        enum: typeAccess
    }
});


module.exports = mongoose.model('Acceso', AccesoSchema);