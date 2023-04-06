const { TodoModel } = require('../models/TodoModel')
const { sendEmail } = require('../utils/email')

// Get all the todo from database
exports.allTodo = async (req, res) => {
  const email = req.query.email
  if (email) {
    try {
      const todos = await TodoModel.find({ user: email })
      res.send(todos)
    } catch (error) {
      console.log(error)
      res.status(400).json(error)
    }
  }
}

// Get all the todo from database
exports.singleTodo = async (req, res) => {
  const id = req.params.id
  const query = { _id: id }
  try {
    const todo = await TodoModel.findOne(query)
    res.send(todo)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}

// Add a todo in the database.
exports.addTodo = async (req, res) => {
  const newTodo = new TodoModel(req.body)

  // save todo in the db
  newTodo
    .save()
    .then(data =>
      res.status(200).message({ message: 'todo Added Successfully!' })
    )
    .catch(error => res.status(400).json(error))
}

// Edit an todo in the database.
exports.updateTodo = async (req, res) => {
  const id = req.params.id
  const todo = await TodoModel.findOne({ _id: id }).exec()

  if (todo) {
    try {
      const updated = await TodoModel.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
      }).exec()

      sendEmail(updated.user, {
        title: `Hello ${updated.user.split('@')[0]}`,
        subject: `Todo Update Successful.`,
        message: `Successfully updated ${updated.title} todo.`,
      })
      res.status(200).json({ message: 'todo Updated Successfully!' })
    } catch (error) {
      res.status(400).json(error)
    }
  }
}

// Delete an todo in the database.
exports.deleteTodo = async (req, res) => {
  const id = req.params.id
  const todo = await TodoModel.findOne({ _id: id }).exec()
  console.log(todo)
  if (todo) {
    try {
      await TodoModel.findOneAndDelete({ _id: id }).exec()
      sendEmail(todo.user, {
        title: `Hello ${todo.user.split('@')[0]}`,
        subject: `Todo Delete Successful.`,
        message: `Successfully deleted ${todo.title} todo.`,
      })
      res.status(200).json({ message: 'todo Deleted Successfully!' })
    } catch (error) {
      console.log(error)
      res.status(400).json(error)
    }
  }
}
