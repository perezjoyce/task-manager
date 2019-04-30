//load mongoose
const mongoose = require('mongoose')
// const validator = require('validator')

// connect to db
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    // options
    useNewUrlParser: true, 
    useCreateIndex: true, //allows us to quickly access data
    useFindAndModify: false
})



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
// const Task = mongoose.model('Task', {
//     description: {
//         type: String,
//         trim: true,
//         required: true
//     }, 
//     completed: {
//         type: Boolean,
//         default: false
//     }
// })

// const task = new Task({
//     description: 'Process BIR docs'
// })

// task.save().then(() => {
//     console.log(task)
// }).catch((error) => {
//     console.log(error)
// })