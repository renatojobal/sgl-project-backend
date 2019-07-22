const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let rolSchema = new Schema({
    name: {
        type: String,
        required: [true, "The name its required!"]
    },
    state: {
        type: Boolean,
        default: true
    }
});


module.exports = mongoose.model('Rol', rolSchema);