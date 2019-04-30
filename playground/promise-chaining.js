//connect with db
require('../src/db/mongoose')

//load in model
const User = require('../src/models/user')

//5cc6cbbb20e22fcbfc22a439
/*$age is not used because we're using mongoose 
library and not mongo db native*/
// User.findByIdAndUpdate('5cc6cbbb20e22fcbfc22a439', { age: 1 })
//     .then((user) => {
//     console.log(user)
//     return User.countDocuments( { age: 1})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

//ASYNC - AWAIT
const updateAgeAndCount = async (id, age) => {
    // age  is shorthand of age:age
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

//use above function
updateAgeAndCount('5cc6cbbb20e22fcbfc22a439', 1)
    //count is what is returned by previous func
    .then((count) => {
        console.log(count)
}).catch((e) => {
    console.log(e)
})