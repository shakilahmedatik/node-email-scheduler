import express from 'express'
import { addUser } from '../controllers/userController'

const router = express.Router()

router.post('/user/add', addUser)

module.exports = router
