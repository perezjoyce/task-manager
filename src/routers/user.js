const express = require('express')
const User = require('../models/user')
const router = new express.Router()

//set up router
// router.get('/test', (req, res) => {
//     res.send('from a new file')
// })

// ================= CREATE =======================
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    //save new user
    // user.save().then(() => {
    //     res.status(201).send(user)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }

})


// ================= READ =======================
//fetch multiple users from db
router.get('/users', async (req, res) => {

    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((e) => {
    //     res.status(500).send()
    // })

    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
    
})

//fetch users by id
router.get('/users/:id', async (req, res) => {
    //extract id
    const _id = req.params.id

    //query id based on mongoose doc
    // User.findById(_id).then((user) => {
    //     if (!user) {
    //         return res.status(404).send() //user doesn't exist
    //     }

    //     res.send(user)
    // }).catch((e) => {
    //     res.status(500).send() //server error
    // })

    try {
        const user = await User.findById(_id)
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send() //server error
    }

})

// ================= UPDATE =======================
router.patch('/users/:id', async (req, res) => {
    // return error 400 when you try to property that doesn't exist
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!'})
    } 

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { 
            new: true, 
            runValidators: true  
        })

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// ================= DELETE =======================
router.delete('/users/:id', async (req, res) => {

    try {
        const user = await User.findOneAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.send(500).send()
    }
})


module.exports = router