const express = require('express')
const router = express.Router()
const CRUDController = require('../controllers/CRUDController')


router.post('/todos',CRUDController.createTodo)
router.get('/todos',CRUDController.viewAllTodos)
router.delete('/todos/:id',CRUDController.deleteTodo)
router.patch('/todos/:id',CRUDController.updateTodoStatus)

module.exports = router