const userModel = require('../models/userModel')

// Add an user in the database.
exports.addUser = async (req, res) => {
  const email = req.body

  const newUser = new userModel(req.body)

  // save todo in the db
  newUser
    .save()
    .then(data => res.status(200).send('user Added Successfully!'))
    .catch(error => res.status(400).json(error))
}
