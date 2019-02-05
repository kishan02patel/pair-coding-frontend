const express = require('express')
const socket = require('socket.io')
const cors = require('cors')
const app = express()
const PORT = 3001

app.use(cors())

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