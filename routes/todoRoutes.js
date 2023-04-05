import express from 'express'
import {
  allTodo,
  addTodo,
  updateTodo,
  deleteTodo,
  singleTodo,
} from '../controllers/todoController'

const router = express.Router()

router.get('/todos', allTodo)
router.get('/todo/:id', singleTodo)
router.post('/todo/add', addTodo)
router.put('/todo/update/:id', updateTodo)
router.delete('/todo/delete/:id', deleteTodo)

module.exports = router
