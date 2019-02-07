import React from 'react'
import { SERVER_URL } from './config/config'

class SessionPage extends React.Component {
	constructor(props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.createSession = this.createSession.bind(this)
	}

	componentDidMount() {
		// Making sure that user is not able to go forward again to the editor page once session is destroyed. 
		window.history.pushState(null, document.title, window.location.href);
		window.addEventListener('popstate', function (event) {
			window.history.pushState(null, document.title, window.location.href);
		});
	}

	handleSubmit(event) {
		event.preventDefault()
		const url = event.target[0].value
		if (url.length === 0)
			alert('This cannot be empty. Either create new session or paste the URL here.')
		else {
			// Check whether the socket namespace exists or not. 
			fetch(`${SERVER_URL}/checkSocketExists?url=${url}`)
				.then(response => response.json())
				.then(response => {
					if (response.isSocketPresent) {
						this.props.history.push({
							pathname: '/editor-page',
							state: { url }
						})
					}
					else {
						if (window.confirm('This URL does not exist. Do you want to create a new session?')) {
							this.createSession()
						}
					}
				})
		}
	}

	createSession() {
		fetch(`${SERVER_URL}/getSessionURL`)
			.then(response => response.json())
			.then(response => {
				var url = response.url
				this.props.history.push({
					pathname: '/editor-page',
					state: { url }
				})
			})
			.catch(err => console.log(err))
	}

	render() {
		return (
			<div>
				<button onClick={this.createSession}>Create New Session</button>
				<br /> <br />
				<h3>OR</h3>
				<br />
				<form onSubmit={this.handleSubmit}>
					<input type="text" placeholder="Type the URL to connect..." />
					<input type="submit" value="Connect" />
				</form>
			</div >
		)
	}
}

export default SessionPage