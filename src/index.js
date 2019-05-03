//load in express
const express = require('express')
const app = express()

//require mongoose file
require('./db/mongoose')

//load models in
const User = require('./models/user')
const Task = require('./models/task')

const multer = require('multer')

//set up for heroku
const port = process.env.PORT

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

