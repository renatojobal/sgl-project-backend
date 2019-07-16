const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let userschema = new Schema({
    name: {
        type: String,
        required: [true, "El nombre es Requerido"]
    },
    lastName: {
        type: String,
        required: [true, "The lastname its required!"]

    },
    email: {
        type: String,
        required: [true, "The email its required!"]
    },
    userName: {
        type: String,
        required: [true, "The userName its required!"]
    },
    password: {
        type: String,
        required: [true, "The password its required!"]
    },
    age: {
        type: Number
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