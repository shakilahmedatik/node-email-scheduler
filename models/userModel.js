const mongoose = require('mongoose')
const { Schema } = mongoose

const todoSchema = Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
)

exports.userModel = mongoose.model('User', todoSchema)
