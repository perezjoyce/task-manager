const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
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
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

// ================= LOGIN =======================
router.post('/users/login', async (req, res) => {
    //create a reusable function
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        //
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

// ================= LOGOUT =======================
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})


// ================= READ =======================
//get profile when authenticated
router.get('/users/me', auth, async (req, res) => {

    // try {
    //     const users = await User.find({})
    //     res.send(users)
    // } catch (e) {
    //     res.status(500).send()
    // }

    //send back user when they're authenticated
    res.send(req.user)
    
})

//fetch users by id: same as above
// router.get('/users/:id', async (req, res) => {
    //extract id
    // const _id = req.params.id

    //query id based on mongoose doc
    // User.findById(_id).then((user) => {
    //     if (!user) {
    //         return res.status(404).send() //user doesn't exist
    //     }

    //     res.send(user)
    // }).catch((e) => {
    //     res.status(500).send() //server error
    // })

//     try {
//         const user = await User.findById(_id)
//         if(!user) {
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch (e) {
//         res.status(500).send() //server error
//     }

// })

// ================= UPDATE =======================
router.patch('/users/me', auth, async (req, res) => {
    // return error 400 when you try to property that doesn't exist
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!'})
    } 

    try {
        // const user = await User.findById(req.user._id)
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()

        // if (!req.user) {
        //     return res.status(404).send()
        // }

        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// ================= DELETE =======================
router.delete('/users/me', auth, async (req, res) => {

    try {
        // const user = await User.findOneAndDelete(req.user._id)

        // if (!user) {
        //     return res.status(404).send()
        // }
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.send(500).send()
    }
})




module.exports = router