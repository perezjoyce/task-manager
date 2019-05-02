const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

// ================= CREATE =======================
router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        /*copy all properties from body 
        to this object using spread operator*/
        ...req.body, 
        //add on owner property 
        //the person that we just authenticated
        owner: req.user._id 
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e) 
    }
})

// ================= READ =======================
//fetch all tasks
router.get('/tasks', auth, async (req, res) => {
    try {
        // APPROACH #1
        //    const tasks = await Task.find({ owner: req.user._id })
        //    res.send(tasks)

        // APPROACH #2
        await req.user.populate('tasks').execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send() //not found
        }
    
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})


// ================= UPDATE =======================
router.patch('/tasks/:id', auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
    //    const task = await Task.findById(req.params.id)
       const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
       
        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// ================= DELETE =======================
router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ 
            _id: req.params.id, 
            owner: req.user._id 
        })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router