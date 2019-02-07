const express = require('express')
const socket = require('socket.io')
const cors = require('cors')
const app = express()
const { PORT } = require('./src/config/config')
const socketsArray = []

app.use(cors())

/*
	This function will genearte a random string and send that string to the client. The function will create a new socket namespace with the randomly generated string as its name.
*/
app.get('/getSessionURL', (req, res) => {
	// Generate a random string which will be used for socket namespace. 
	const url = Math.random().toString(36).substring(2);
	console.log('New socket URL is', url)

	// Keep track of all the socket namespaces taht are generated.
	socketsArray.push(url)

	// Create a new socket namespace
	var newSocket = io.of(url)
	newSocket.on('connection', (socket) => {
		console.log('Someone connected with socket id', socket.id)

		// Event listener to listen to the data send by the client.
		socket.on('SEND_MESSAGE', (data) => {
			// Send the data to other clients except the sender
			socket.broadcast.emit('RECEIVE_MESSAGE', data)
		})

		// Event listener to listen to client if they changed the language settings.
		socket.on('CHANGED_LANGUAGE', (data) => {
			// Send this change to other clients except the sender.
			socket.broadcast.emit('RECEIVE_NEW_LANGUAGE', data)
		})

		// Event listener to listen to request when the user is going to leave the session.
		socket.on('LEAVE_SESSION', () => {
			const namespaceName = socket.nsp.name
			console.log(namespaceName)

			// Count number of clients connected to a particular socket namespace.
			newSocket.clients((error, clients) => {
				console.log(`Clients in ${namespaceName} are`, clients.length)
			})
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