import mongoose from 'mongoose'
const { Schema } = mongoose

const todoSchema = Schema(
  {
    title: { type: String, required: true, minlength: 4, maxlength: 16 },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 100,
    },
    due: { type: String, required: true },
    user: {
      type: String,
      required: true,
    },
    notified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Todos', todoSchema)
