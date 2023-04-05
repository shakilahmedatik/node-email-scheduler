import mongoose from 'mongoose'
require('dotenv').config()

// Connect via mongoose
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'))
  .catch(err => {
    console.log('DB Connection Failed !')
    console.log('err', err)
  })
