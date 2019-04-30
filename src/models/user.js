//load in dependencies
const mongoose = require('mongoose')
const validator = require('validator')

//define the MODEL we're working with
const User = mongoose.model('User', {
    name: {
        type: String, //constructor function from JS
        required: true, 
        trim: true
    }, 
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number, //constructor function from JS
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    }, 
    password: {
        type: String,
        required: true, 
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().match('password')) {
                throw new Error('Password shouldn\'t contain "password"')
            }
        }

    }
})

module.exports = User