import React from 'react'
import { SERVER_URL } from './config/config'

const SessionPage = (props) => {

	function handleSubmit(event) {
		/*
		**	Make sure if the socket does not exist then ask the user whether he/she wants to create a new socket.
		*/
		event.preventDefault()
		const url = event.target[0].value
		if (url.length === 0)
			alert('This cannot be empty. Either create new session or paste the URL here.')
		else {
			console.log(url)
			props.history.push({
				pathname: '/editor-page',
				state: { url }
			})
		}
	}

	function createSession() {
		fetch(`${SERVER_URL}/getSessionURL`)
			.then(response => response.json())
			.then(response => {
				var url = response.url
				props.history.push({
					pathname: '/editor-page',
					state: { url }
				})
			})
			.catch(err => console.log(err))
	}

	return (
		<div>
			<button onClick={createSession}>Create New Session</button>
			<br /><br />
			<h3>OR</h3>
			<br />
			<form onSubmit={handleSubmit}>
				<input type="text" placeholder="Type the URL to connect..." />
				<input type="submit" value="Connect" />
			</form>
		</div>
	)
}

export default SessionPage