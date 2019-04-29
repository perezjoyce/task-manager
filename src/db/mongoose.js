//load mongoose
const mongoose = require('mongoose')
const validator = require('validator')

// connect to db
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    // options
    useNewUrlParser: true, 
    useCreateIndex: true //allows us to quickly access data
})

//define the MODEL we're working with
// const User = mongoose.model('User', {
//     name: {
//         type: String, //constructor function from JS
//         required: true, 
//         trim: true
//     }, 
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate(value){
//             if (!validator.isEmail(value)) {
//                 throw new Error('Email is invalid')
//             }
//         }
//     },
//     age: {
//         type: Number, //constructor function from JS
//         default: 0,
//         validate(value) {
//             if (value < 0) {
//                 throw new Error('Age must be a positive number')
//             }
//         }
//     }, 
//     password: {
//         type: String,
//         required: true, 
//         minlength: 7,
//         trim: true,
//         validate(value) {
//             if (value.toLowerCase().match('password')) {
//                 throw new Error('Password shouldn\'t contain "password"')
//             }
//         }

//     }
// })

// create INSTANCE of model
// const me = new User({
//     name: '    Mike    ', 
//     email: ' mike@GMAIL.com ',
//     password: 'Paswordfrew '
// })

// save to db
// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error! ', error)
// })

// ===============CHALLENGE ======================
const Task = mongoose.model('Task', {
    description: {
        type: String,
        trim: true,
        required: true
    }, 
    completed: {
        type: Boolean,
        default: false
    }
})

const task = new Task({
    description: 'Process BIR docs'
})

task.save().then(() => {
    console.log(task)
}).catch((error) => {
    console.log(error)
})