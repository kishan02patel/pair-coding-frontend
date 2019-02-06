import React from 'react'
import { SERVER_URL } from './config/config'

const SessionPage = (props) => {

	function handleSubmit(event) {
		/*		
		**  Develop a functionality that allows user to select whether 2 people should be able to type 				simultaneouly or when one is typing the other one should not be able to type. If 2 people are typing 	simultaneously then whose code will be kept. Also figure out that if 2 people are typing 2 different 	things then both of them should be kept(check the line numbers or some other logic.) 
		    
		**	When a new person is connected to a socket the data and language already transfered is not shown to 	him until and unless code is changed and language is changed. 
		*/
		event.preventDefault()
		const url = event.target[0].value
		if (url.length === 0)
			alert('This cannot be empty. Either create new session or paste the URL here.')
		else {
			fetch(`${SERVER_URL}/checkSocketExists?url=${url}`)
				.then(response => response.json())
				.then(response => {
					if (response.isSocketPresent) {
						props.history.push({
							pathname: '/editor-page',
							state: { url }
						})
					}
					else {
						if (window.confirm('This URL does not exist. Do you want to create a new session?')) {
							createSession()
						}
					}
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