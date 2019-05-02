//load in express
const express = require('express')
const app = express()

//require mongoose file
require('./db/mongoose')

//load models in
const User = require('./models/user')
const Task = require('./models/task')

//set up for heroku
const port = process.env.PORT || 3000

//regiser middleware functions (i.e, do something)
// app.use((req, res, next) => {
//    if (req.method ==='GET') {
//     return res.send('GET requests are disabled')
//    } 
//    next()
// })

//register a middleware function to disable all requests 
// app.use((req, res, next) => {
//     res.status(503).send('The site is under maintenance. Please come back soon.')
// })

//configure express to automatically parse incoming JSON to an object
app.use(express.json())

//================== Create new router =============

//load in user router
const userRouter = require('./routers/user')
app.use(userRouter)

//load in task router
const taskRouter = require('./routers/task')
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


// //jasonwebserver 
// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     //jsonwebtoken
//     const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn: '7 days'})
//     console.log(token)

//     //verify token
//     const data = jwt.verify(token, 'thisismynewcourse')
//     console.log(data)
// }

// myFunction()

// const main = async () => {
    // const task = await Task.findById('5cca9ad496537e8594e01f04')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    //start with a user and find their tasks
    // const user = await User.findById('5cca9ac096537e8594e01f01')
    // await user.populate('tasks').execPopulate()
    // console.log(user.tasks)
// }

// main()