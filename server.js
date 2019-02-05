const express = require('express')
const socket = require('socket.io')
const cors = require('cors')
const app = express()
const { PORT } = require('./src/config/config')
const socketsArray = []

app.use(cors())

app.get('/getSessionURL', (req, res) => {
	const url = Math.random().toString(36).substring(2);
	console.log(url)
	socketsArray.push(url)

	res.send({ url })
})

server = app.listen(PORT, () => {
	console.log('Server started on port:', PORT)
	io = socket(server)
	io.on('connection', (socket) => {
		console.log('Someone Connected with socket id', socket.id)
		socket.on('SEND_MESSAGE', (data) => {
			console.log(data)
		})
	})
})