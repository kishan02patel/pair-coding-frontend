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
	var newSocket = io.of(url)
	newSocket.on('connection', (socket) => {
		console.log('Someone connected with socket id', socket.id)
		socket.on('SEND_MESSAGE', (data) => {
			socket.broadcast.emit('RECEIVE_MESSAGE', data)
		})
		socket.on('CHANGED_LANGUAGE', (data) => {
			socket.broadcast.emit('RECEIVE_NEW_LANGUAGE', data)
		})
	})
	res.send({ url })
})

app.get('/checkSocketExists', (req, res) => {
	if (socketsArray.includes(req.query.url))
		res.send({ isSocketPresent: true })
	else
		res.send({ isSocketPresent: false })
})

server = app.listen(PORT, () => {
	console.log('Server started on port:', PORT)
	io = socket(server)
})