require('../src/db/mongoose')
const Task = require('../src/models/task')

//REMOVE A GIVEN TASK BY ID
// Task.findByIdAndDelete('5cc6c39a996079c2c067d148')
// .then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

//ASYNC-AWAIT
const deleteTaskAndCount = async (id) => {
    await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount('5cc6c340b7f799c7b49ff0b6')
    .then((count) => {
        console.log(count)
}).catch((e) => {
    console.log(e)
})

