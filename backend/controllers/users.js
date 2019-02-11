const express = require('express')
const router = express.Router()
const { User } = require('../models/user')

router.post('/register', (req, res) => {
	const newUser = new User(req.body)
	newUser.save()
		.then(() => {
			res.send({ success: 'User registered successfully' })
		})
		.catch(err => res.send({ error: err }))
})

module.exports = {
	userRouter: router
}