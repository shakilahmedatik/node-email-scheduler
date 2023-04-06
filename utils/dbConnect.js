const mongoose = require('mongoose')
module.exports = () => {
  console.log(`connecting to Atlas DB...`)
  mongoose.set('strictQuery', true)
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
}
