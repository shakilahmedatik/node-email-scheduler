import todoModel from '../models/todoModel'
import { sendEmail } from '../utils/email'

// Get all the todo from database
export const allTodo = async (req, res) => {
  const email = req.query.email
  if (email) {
    try {
      const todos = await todoModel.find({ user: email })
      res.send(todos)
    } catch (error) {
      console.log(error)
      res.status(400).json(error)
    }
  }
}

// Get all the todo from database
export const singleTodo = async (req, res) => {
  const id = req.params.id
  const query = { _id: id }
  try {
    const todo = await todoModel.findOne(query)
    res.send(todo)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}

// Add a todo in the database.
export const addTodo = async (req, res) => {
  const newTodo = new todoModel(req.body)

  // save todo in the db
  newTodo
    .save()
    .then(data => res.status(200).send('todo Added Successfully!'))
    .catch(error => res.status(400).json(error))
}

// Edit an todo in the database.
export const updateTodo = async (req, res) => {
  const id = req.params.id
  const todo = await todoModel.findOne({ _id: id }).exec()

  if (todo) {
    try {
      const updated = await todoModel
        .findOneAndUpdate({ _id: id }, req.body, { new: true })
        .exec()

      sendEmail(updated.user, {
        title: `Hello ${updated.user.split('@')[0]}`,
        subject: `Todo Update Successful.`,
        message: `Successfully updated ${updated.title} todo.`,
      })
      res.status(200).send('todo Updated Successfully!')
    } catch (error) {
      res.status(400).json(error)
    }
  }
}

// Delete an todo in the database.
export const deleteTodo = async (req, res) => {
  const id = req.params.id
  const todo = await todoModel.findOne({ _id: id }).exec()
  console.log(todo)
  if (todo) {
    try {
      await todoModel.findOneAndDelete({ _id: id }).exec()
      sendEmail('shakilatik@gmail.com', {
        title: `Hello ${todo.user.split('@')[0]}`,
        subject: `Todo Delete Successful.`,
        message: `Successfully deleted ${todo.title} todo.`,
      })
      res.status(200).send('todo Deleted Successfully!')
    } catch (error) {
      console.log(error)
      res.status(400).json(error)
    }
  }
}
