const express = require('express')
const {
  allTodo,
  addTodo,
  updateTodo,
  deleteTodo,
  singleTodo,
} = require('../controllers/todoController')

const router = express.Router()

router.get('/todos', allTodo)
router.get('/todo/:id', singleTodo)
router.post('/todo/add', addTodo)
router.put('/todo/update/:id', updateTodo)
router.delete('/todo/delete/:id', deleteTodo)

module.exports = router
