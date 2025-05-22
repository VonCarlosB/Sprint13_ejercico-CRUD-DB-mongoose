const express = require('express')
const router = express.Router()
const Task = require('../models/Task.js')

router.post('/create', async(req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).send(task)
    } catch (error) {
        console.error(error)
        res.status(500).send({message: 'There was a problem trying to create a task'})
    }
})

router.get('/', async(req, res) => {
    try{
        const allTasks = await Task.find({})
        res.status(201).send(allTasks)
    }catch(error){
        console.error(error)
        res.status(500).send({message: 'There was a problem trying to get all tasks'})
    }
})

router.get('/id/:id', async(req, res) => {
    try{
        const taskById = await Task.findById(req.params.id)
        res.status(201).send(taskById)
    }catch(error){
        console.error(error)
        res.status(500).send({message: 'There was a problem trying to get the task with id'+req.params.id})
    }
})

router.put('/markAsCompleted/:id', async(req, res) => {
    try{
        let completedTask = await Task.findByIdAndUpdate(req.params.id,{"completed":true})
        completedTask = await Task.findById(req.params.id)
        res.status(201).send(completedTask)
    }catch(error){
        console.error(error)
        res.status(500).send({message: 'There was a problem trying to update the task with id'+req.params.id})
    }
})

router.put('/id/:id', async(req, res) => {
    try{
        const newTitle = req.body.title
        let updatedTask = await Task.findByIdAndUpdate(req.params.id,{"title":newTitle})
        updatedTask = await Task.findById(req.params.id)
        res.status(201).send(updatedTask)
    }catch(error){
        console.error(error)
        res.status(500).send({message: 'There was a problem trying to update the task with id'+req.params.id})
    }
})

router.delete('/id/:id', async(req, res) => {
    try{
        const deletedTask = await Task.findByIdAndDelete(req.params.id)
        if(deletedTask == null){
            res.status(201).send('Task not found')
        }
        res.status(201).send(deletedTask)
    }catch(error){
        console.error(error)
        res.status(500).send({message: 'There was a problem trying to delete the task with id'+req.params.id})
    }
})

module.exports = router