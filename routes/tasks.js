const express = require('express')
const router = express.Router()
const TaskController = require('../controllers/TaskController.js')

router.post('/create', TaskController.create)

router.get('/', TaskController.getAll)

router.get('/id/:id', TaskController.getById)

router.put('/markAsCompleted/:id', TaskController.markAsCompleted)

router.put('/id/:id', TaskController.updateTitle)

router.delete('/id/:id', TaskController.deleteById)

module.exports = router