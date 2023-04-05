import mongoose from 'mongoose'
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

export default mongoose.model('User', todoSchema)
