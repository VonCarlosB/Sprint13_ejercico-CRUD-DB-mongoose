const Task = require('../models/Task.js')

const TaskController = {
    async create (req, res){
        try {
            const task = await Task.create({title: req.body.title, completed: false})
            res.status(201).send(task)
        } catch (error) {
            console.error(error)
            res.status(500).send({message: 'There was a problem trying to create a task'})
        }
    },
    async getAll(req, res){
        try{
            const allTasks = await Task.find()
            res.status(201).send(allTasks)
        }catch(error){
            console.error(error)
            res.status(500).send({message: 'There was a problem trying to get all tasks'})
        }
    },
    async getById(req, res){
        try{
            const taskById = await Task.findById(req.params.id)
            res.status(201).send(taskById)
        }catch(error){
            console.error(error)
            res.status(500).send({message: 'There was a problem trying to get the task with id'+req.params.id})
        }
    },
    async markAsCompleted(req, res){
        try{
            let completedTask = await Task.findByIdAndUpdate(req.params.id,{"completed":true}, {new: true})
            res.status(201).send(completedTask)
        }catch(error){
            console.error(error)
            res.status(500).send({message: 'There was a problem trying to update the task with id'+req.params.id})
        }
    },
    async updateTitle(req, res){
        try{
            const newTitle = req.body.title
            let updatedTask = await Task.findByIdAndUpdate(req.params.id,{"title":newTitle}, {new: true})
            res.status(201).send(updatedTask)
        }catch(error){
            console.error(error)
            res.status(500).send({message: 'There was a problem trying to update the task with id'+req.params.id})
        }
    },
    async deleteById(req, res){
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
    }
}

module.exports = TaskController