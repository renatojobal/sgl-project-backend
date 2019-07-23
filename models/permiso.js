const mongoose = require('mongoose')
let Schema = mongoose.Schema;


let PermisoSchema = new Schema({
    day: {
        type: String,
        required: [true, 'The day must be assigned']
    },
    start_time: {

        type: String,
        required: [true, 'The start time must be assigned']
    },
    end_time: {

        type: String,
        required: [true, 'The end time must be assigned']
    },
    rol: {
        type: Schema.Types.ObjectId,
        ref: 'Rol',
        required: [true, 'Its required']
    },
    state: {
        type: Boolean,
        default: true
    }
});


module.exports = mongoose.model('Permiso', PermisoSchema);