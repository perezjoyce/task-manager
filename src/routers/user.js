const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()
const multer = require('multer')
const sharp = require('sharp')
const { sendWelcomeEmail, sendGoodbyeEmail } = require('../emails/account')

// ================= CREATE =======================
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        sendWelcomeEmail(user.email, user.name)
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

    //send back user when they're authenticated
    res.send(req.user)
    
})

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

        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// ================= DELETE =======================
router.delete('/users/me', auth, async (req, res) => {

    try {
        await req.user.remove()
        sendGoodbyeEmail(req.user.email, req.user.name)
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

// ================= CREATE & UPDATE AVATAR =======================
const upload = multer({
    // dest: 'images/avatar',
    limits: {
        fileSize: 1000000
    }, 
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image.'))
        }
        cb(undefined, true)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    //buffer of modified image file
    const buffer = await sharp(req.file.buffer).resize({
        width: 250,
        height: 250
    }).png().toBuffer()
    
    //save modified buffer in User model to avatar
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    //handle errors
    res.status(400).send({ error: error.message })
})

// ================= READ AVATAR =======================
router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        //send back the correct data
        //tell the requester what type of data they're getting back
        res.set('Content-Type', 'image/png') //set content header
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})

// ================= DELETE AVATAR =======================
router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send(req.user)
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})


module.exports = router