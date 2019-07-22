const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let userschema = new Schema({
    firstName: {
        type: String,
        required: [true, "El nombre es Requerido"]
    },
    secondName: {
        type: String,
        required: [true, "El segundo nombre es requerido!"]
    },
    firstSurname: {
        type: String,
        required: [true, "The firstSurname its required!"]
    },
    secondSurname: {
        type: String,
        required: [true, "The secondSruname its required!"]

    },
    email: {
        type: String,
        required: [true, "The email its required!"]
    },
    username: {
        type: String,
        required: [true, "The username its required!"]
    },
    password: {
        type: String,
        required: [true, "The password its required!"]
    },
    rol: {
        type: Schema.Types.ObjectId,
        ref: 'Rol',
        required: [true, "The rol its required!"]
    },
    state: {
        type: Boolean,
        default: true
    }

});

userschema.methods.toJSON = function () {
    let user = this
    let user_object = user.toObject()
    delete user_object.password
    return user_object
};


module.exports = mongoose.model('User', userschema);