const express = require('express')
const { readdirSync } = require('fs')
const { formatDistanceStrict } = require('date-fns')
var cron = require('node-cron')
require('dotenv').config()
const morgan = require('morgan')
const cors = require('cors')
const { TodoModel } = require('./models/TodoModel')
const { sendEmail } = require('./utils/email')
const DBConnect = require('./utils/dbConnect')
// express app
const app = express()

// Connect via mongoose
DBConnect()

// Middlewares
const corsConfig = {
  origin: true,
  credentials: true,
}
app.use(cors(corsConfig))
app.options('*', cors(corsConfig))
app.use(express.json({ limit: '5mb' }))
app.use(morgan('dev'))

// route
readdirSync('./routes').map(r => app.use('/api', require(`./routes/${r}`)))

//Email Scheduler for due todos notification
const getData = async () => {
  const todos = await TodoModel.find({ notified: false })

  if (todos.length > 0) {
    for (let todo of todos) {
      const difference = formatDistanceStrict(new Date(), new Date(todo.due), {
        unit: 'minute',
      })
      console.log(difference)

      if (difference.split(' ')[0] < 60) {
        await TodoModel.findOneAndUpdate({ _id: todo._id }, { notified: true })
        sendEmail(todo.user, {
          title: `Hello ${todo.user.split('@')[0]}`,
          subject: `Due date for ${todo.title} is coming soon`,
          message: 'You have less than 1 hour left, so hurry up fast!!!',
        })
      }
    }
  }
  return console.log('Scheduler is active')
}

cron.schedule('* * * * *', () => {
  getData()
})

// port
const port = process.env.PORT || 8000
app.get('/', (req, res) => res.send('Hello!'))
app.listen(port, () => console.log(`Server is running at port ${port}.`))
