//store what comes back from requiring mongodb npm library
const mongodb = require('mongodb')

/*initialize connection through mongo client to access necessary functions 
to connect to the db and perform CRUD*/
// const MongoClient = mongodb.MongoClient

/* define the URL & the db we're trying to connect to */
const connectionURL = 'mongodb://127.0.0.1:27017' //localhost
const databaseName = 'task-manager' 


// DESTRUCTURE lines 6 and 14
// const ObjectID = mongodb.ObjectID
const { MongoClient, ObjectID } = require('mongodb')

//create new instance of id
// const id = new ObjectId()
// console.log(id)
//get timestamp of id
// console.log(id.getTimestamp())


/* connect to server */
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to datase')
    }
    
    // console.log('Connected Correctly')
    const db = client.db(databaseName) //reference to the db you're trying to manipulate

    // CREATING/INSERTING
    // db.collection('users').insertOne(
    //     {   
    //         _id: id,
    //         name: 'Joyce',
    //         age: 31
    //     }, (error, result) => {
    //         if (error) {
    //             return console.log('Unable to insert documents')
    //         }

    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Get medical certificate',
    //         completed: false
    //     }, {
    //         description: 'Get BIR docs', 
    //         completed: false
    //     }, {
    //         description: 'Update PRC license',
    //         completed: true
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert tasks')
    //     }

    //     console.log(result.ops)
    // })

    //READING/QUERYING
    // db.collection('users').findOne({ _id: ObjectID("5cc6842d294a366534a8ce44") }, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch user')
    //     }
        
    //     console.log(user)
    // })

    // db.collection('users').find({ age: 31}).count((error, users)=> {
    //     console.log(users)
    // })

    // db.collection('tasks').findOne({ completed: true }, (error, task) => {
    //     if(error) {
    //         return console.log('No match found')
    //     }

    //     console.log(task)
    // })

    // db.collection('tasks').findOne( { _id: ObjectID('5cc6862af2bb40a13476e939')}, (error, task) => {
    //     if (error) {
    //         return console.log('No match found')
    //     }

    //     console.log(task)
    // })

    // db.collection('tasks').find({ completed: false }).toArray((error, task) => {
    //     if (error) {
    //         return console.log('All tasks have been completed')
    //     }
        
    //     console.log(task)
    // })

    //UPDATING
    // db.collection('users').updateOne({ 
    //     _id: ObjectID("5cc680cb4b84c9ce7c45c6fc"),
    // }, {
    //     $inc: {
    //         age: 1 //increment 
    //         // age: -1 //decrement
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('tasks').updateMany({
    //     completed: false
    // }, {
    //     $set : {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result)
    //     console.log('All tasks have been successfuly updated')
    // }).catch((error) => {
    //     console.log(error)
    //     console.log('Error')
    // })

    // db.collection('users').deleteMany({
    //     age: 5
    // }).then((result) => {
    //     console.log('success')
    //     console.log(result)
    // }).catch((error) => {
    //     console.log('error')
    //     console.log(error)
    // })

    db.collection('tasks').deleteOne({
        description: 'Update PRC license'
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

})
