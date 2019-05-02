//load dependencies
const mongoose = require('mongoose')
const User = require('../models/user') 

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required: true
    }, 
    completed: {
        type: Boolean,
        default: false
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Task = new mongoose.model('Task', taskSchema)

module.exports = Task